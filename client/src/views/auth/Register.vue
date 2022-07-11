<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div class="card card-body mt-5 c-card p-5">
                    <register-form :submitHandler="submitHandler" :data="state.data" :v$="v$" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterForm from '@/components/forms/RegisterForm';
import { computed } from '@vue/reactivity';
import useVuelidate from '@vuelidate/core';
import { email, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { ref } from 'vue';
import { mapActions, useStore } from 'vuex';

export default {
    name: 'Register',
    components: { RegisterForm },
    setup(_props) {
        const store = useStore();
        document.title = 'Register';

        store.dispatch('activeAuthButton', 'register')

        const state = ref({
            data: {
                nid: '',
                firstName: '',
                lastName: '',
                dob: '',
                email: '',
                password: '',
                confirmPassword: '',
                agree: false,
                isLoading: false,
            }
        });

        // validations
        const rules = computed(() => {
            return {
                nid: { required, minLength: minLength(4), maxLength: maxLength(11) },
                firstName: { required, minLength: minLength(3), maxLength: maxLength(15) },
                lastName: { required, minLength: minLength(3), maxLength: maxLength(15) },
                email: { required, email },
                dob: { required },
                password: { required, minLength: minLength(4) },
                confirmPassword: { required, sameAs: sameAs(state.value.data.password) }
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
                await this.$store.dispatch('register', {
                    nid: this.state.data.nid,
                    firstName: this.state.data.firstName,
                    lastName: this.state.data.lastName,
                    dob: this.state.data.dob,
                    email: this.state.data.email,
                    password: this.state.data.password,
                    confirmPassword: this.state.data.confirmPassword,
                });
                this.pushNotification({ type: 'success', msg: 'Successfully created a new account. Now login to your account.' });
                this.state.data.isLoading = false;
                this.$router.push({ name: 'login' });
            } catch (e) {
                this.pushNotification({ type: 'danger', msg: e.message });
                this.state.data.password = '';
                this.state.data.confirmPassword = '';
                this.state.data.isLoading = false;
            }

        },
    },
}
</script>

<style scoped>
</style>
