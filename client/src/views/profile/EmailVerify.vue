<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="email-verify" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="mt-4" aria-hidden="true">
                    <verify-email-form
                        :resentVerificationTokenHandler="resentVerificationTokenHandler"
                        :submitHandler="submitHandler"
                        :user="user"
                        :isVerifyButtonLoading="state.isVerifyButtonLoading"
                        :isResentLoading="state.isResentLoading"
                        :data="state.data"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VerifyEmailForm from '@/components/forms/profile-settings/VerifyEmailForm.vue';
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useStore } from 'vuex';

export default {
    name: 'EmailVerify',
    components: { SettingsSidebar, VerifyEmailForm },
    setup() {
        document.title = 'Verify email address';
        const store = useStore();
        const state = reactive({
            data: {
                token: '',  
            },
            isVerifyButtonLoading: false,
            isResentLoading: false,
        });
        const user = computed(() => store.getters.getUser);

        const submitHandler = async () => {
            state.isVerifyButtonLoading = true;
            try {
                await store.dispatch('verifyEmailAddress', { token: state.data.token });
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'Your account has been activated.',
                });
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            } finally {
                state.isVerifyButtonLoading = false;
            }
        };

        const resentVerificationTokenHandler = async () => {
            state.isResentLoading = true;
            try {
                await store.dispatch('resendEmailVerificationToken');
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'An email has been sent to your email address with a verification code.',
                });
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            } finally {
                state.isResentLoading = false;
            }
        };

        return { state, user, submitHandler, resentVerificationTokenHandler };
    },
}
</script>

<style scoped>
</style>