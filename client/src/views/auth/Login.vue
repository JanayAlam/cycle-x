<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div class="card card-body mt-5 c-card p-5">
                    <login-form :submitHandler="submitHandler" :data="state.data" :v$="v$" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue';
import { computed } from '@vue/reactivity';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { ref } from 'vue';
import { mapActions, mapGetters, useStore } from 'vuex';

export default {
    name: 'Login',
    components: { LoginForm },
    computed: {
        ...mapGetters(['getToken', 'getUser', 'getProfile']),
    },
    setup(_props) {
        const store = useStore();
        document.title = 'Login';

        store.dispatch('activeAuthButton', 'login')

        const state = ref({
            data: {
                email: '',
                password: '',
                isLoading: false,
            }
        });

        // validations
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(4) },
            }
        });
        const v$ = useVuelidate(rules, state.value.data);

        return { v$, state };
    },
    methods: {
        ...mapActions(['pushNotification']),
        async submitHandler() {
            this.state.data.isLoading = true;
            this.v$.$validate();
            if (this.v$.$error) return;
            try {
                await this.$store.dispatch('login', {
                    email: this.state.data.email,
                    password: this.state.data.password,
                });
                this.pushNotification({ type: 'success', msg: 'Successfully logged in.' });
                this.state.data.isLoading = false;
                this.$router.replace({ name: 'home' });
            } catch (e) {
                this.pushNotification({ type: 'danger', msg: e.message })
                this.state.data.password = '';
                this.state.data.isLoading = false;
            }
        },
    }
}
</script>

<style scoped>
</style>
