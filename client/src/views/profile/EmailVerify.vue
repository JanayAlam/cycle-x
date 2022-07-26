<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="email-verify" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="card card-body c-card" aria-hidden="true">
                    <verify-email-form
                        :resentVerificationTokenHandler="resentVerificationTokenHandler"
                        :submitHandler="submitHandler"
                        :user="user"
                        :isLoading="isLoading"
                        :isResentLoading="isResentLoading"
                        :token="token"
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
            isLoading: false,
            isResentLoading: false,
            token: '',
        });
        const user = computed(() => store.getters.getUser);

        const submitHandler = () => {};

        const resentVerificationTokenHandler = () => {};

        return { ...state, user, submitHandler, resentVerificationTokenHandler };
    },
}
</script>

<style scoped>
</style>