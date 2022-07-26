<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="change-password" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="card card-body c-card" aria-hidden="true">
                    <change-password-form
                        :data="data"
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

export default {
    name: 'ChangePassword',
    components: { SettingsSidebar, ChangePasswordForm },
    setup() {
        const state = reactive({
            data: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
        });

        const submitHandler = () => {};

        const v$ = '';

        return { ...state, submitHandler, v$ };
    },
};
</script>

<style scoped></style>
