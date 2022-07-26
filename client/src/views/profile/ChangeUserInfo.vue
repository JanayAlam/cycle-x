<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="change-user-info" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="card card-body c-card" aria-hidden="true">
                    <user-information-form :user="user" :isLoading="isLoading" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserInformationForm from '@/components/forms/profile-settings/UserInformationForm.vue';
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';


export default {
    name: 'ChangeEmailNid',
    components: { SettingsSidebar, UserInformationForm },
    setup() {
        document.title = 'Update user information';
        const store = useStore();
        const isLoading = false;
        const user = computed(() => store.getters.getUser);

        const submitHandler = async () => {
            try {
                //
                store.dispatch('pushNotification', { type: 'success', msg: 'User information updated' });
            } catch (e) {
                store.dispatch('pushNotification', { type: 'danger', msg: e.message });
            }

        };

        return { user, isLoading, submitHandler };
    },
}
</script>

<style scoped>
</style>
