<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="change-user-info" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="mt-4" aria-hidden="true">
                    <user-information-form
                        :user="user"
                        :data="data"
                        :isLoading="isLoading"
                        :submitHandler="submitHandler"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserInformationForm from '@/components/forms/profile-settings/UserInformationForm.vue';
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { useStore } from 'vuex';
import { reactive } from 'vue';
import { computed } from '@vue/reactivity';

export default {
    name: 'ChangeEmailNid',
    components: { SettingsSidebar, UserInformationForm },
    setup() {
        document.title = 'Update user information';
        const store = useStore();
        const isLoading = false;

        const state = reactive({
            data: {
                nid: '',
                email: '',
            },
        });

        const user = computed(() => store.getters.getUser);

        const submitHandler = async () => {
            try {
                await store.dispatch('updateUser', {
                    nid: state.data.nid,
                    email: state.data.email,
                });
                state.data.nid = '';
                state.data.email = '';
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'User information updated',
                });
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            }
        };

        return { ...state, user, isLoading, submitHandler };
    },
};
</script>

<style scoped></style>
