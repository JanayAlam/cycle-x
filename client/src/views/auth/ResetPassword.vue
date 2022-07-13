<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1 ">
                <div class="card card-body mt-5 c-card p-5">
                    <reset-password-form :data="state.data" :isLoading="state.isLoading" :v$="v$"
                        :submitHandler="submitHandler" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue';
import { computed } from '@vue/reactivity';
import useVuelidate from '@vuelidate/core';
import { minLength, required, sameAs } from '@vuelidate/validators';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: { ResetPasswordForm },
    setup() {
        document.title = 'Reset Password'
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            userId: route.params.userId,
            token: route.params.token,
            data: {
                password: '',
                confirmPassword: '',
            },
            isLoading: false,
        });

        // validations
        const rules = computed(() => {
            return {
                password: { required, minLength: minLength(4) },
                confirmPassword: { required, sameAs: sameAs(state.data.password) },
            }
        });
        const v$ = useVuelidate(rules, state.data);

        // submit handler
        const submitHandler = async () => {
            state.isLoading = true;
            v$.value.$validate();
            if (v$.value.$error) {
                state.isLoading = false;
                return;
            }
            try {
                await store.dispatch('resetPassword', {
                    ...state.data,
                    userId: state.userId,
                    token: state.token,
                });
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'Password reset successfully. Now login with the new password.'
                });
                router.push({ name: 'login' });
            } catch (e) {
                store.dispatch('pushNotification', { type: 'danger', msg: e.message });
            } finally {
                state.isLoading = false;
            }
        }

        return { state, v$, submitHandler };
    },
}
</script>

<style scoped>
</style>
