<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="change-password" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="mt-4" aria-hidden="true">
                    <change-password-form
                        :data="state.data"
                        :isLoading="state.isLoading"
                        :submitHandler="submitHandler"
                        :v$="v$"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import ChangePasswordForm from '@/components/forms/profile-settings/ChangePasswordForm.vue';
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required, sameAs } from '@vuelidate/validators';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: 'ChangePassword',
    components: { SettingsSidebar, ChangePasswordForm },
    setup() {
        document.title = 'Update password';
        const store = useStore();

        const state = reactive({
            data: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            isLoading: false,
        });

        const rules = computed(() => {
            return {
                oldPassword: { minLength: minLength(4) },
                newPassword: { minLength: minLength(4) },
                confirmPassword: {
                    sameAs: sameAs(state.data.newPassword),
                },
            };
        });
        const v$ = useVuelidate(rules, state.data);

        const submitHandler = async () => {
            state.isLoading = true;

            // validation
            v$.value.$validate();
            if (v$.value.$error) {
                state.isLoading = false;
                return;
            }

            // sending axios request
            try {
                await store.dispatch('changePassword', {
                    oldPassword: state.data.oldPassword,
                    newPassword: state.data.newPassword,
                    confirmPassword: state.data.confirmPassword,
                });
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'Password changed successfully',
                });
                state.data.oldPassword = '';
                state.data.newPassword = '';
                state.data.confirmPassword = '';
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            } finally {
                state.isLoading = false;
            }
        };

        return { state, submitHandler, v$ };
    },
};
</script>

<style scoped></style>
