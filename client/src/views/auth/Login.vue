<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 offset-lg-2 col-md-10 offset-md-1">
                <div class="card card-body mt-5 c-card p-5">
                    <login-form @toggler="modalToggler" :submitHandler="submitHandler" :data="state.data" :v$="v$" />
                </div>
            </div>
        </div>
        <!-- <modal /> -->
        <modal header="Forget Password" :toggler="modalToggler" :modalActive="state.modalActive">
            <form @submit.prevent="submitForgetPasswordHandler">
                <div class="mb-2">
                    <label for="emailField" class="form-label mb-1">Email address</label>
                    <input type="email" class="form-control" id="emailField" placeholder="Your email address">
                </div>
                <button class="btn btn-sm btn-primary">
                    <font-awesome-icon icon="fa-solid fa-paper-plane" /> Send Email
                </button>
            </form>
        </modal>
    </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue';
import Modal from '@/components/modal/Modal.vue';
import { computed } from '@vue/reactivity';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { reactive } from 'vue';
import { mapActions, mapGetters, useStore } from 'vuex';

export default {
    name: 'Login',
    components: { LoginForm, Modal },
    computed: {
        ...mapGetters(['getToken', 'getUser', 'getProfile']),
    },
    setup(_props) {
        const store = useStore();
        document.title = 'Login';

        store.dispatch('activeAuthButton', 'login')

        const state = reactive({
            data: {
                email: '',
                password: '',
                isLoading: false,
            },
            modalActive: false,
        });

        // validations
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(4) },
            }
        });
        const v$ = useVuelidate(rules, state.data);

        return { v$, state };
    },
    methods: {
        ...mapActions(['pushNotification']),
        async submitHandler() {
            this.state.isLoading = true;
            this.v$.$validate();
            if (this.v$.$error) {
                this.state.isLoading = false;
                return;
            };
            try {
                await this.$store.dispatch('login', {
                    email: this.state.email,
                    password: this.state.password,
                });
                this.pushNotification({ type: 'success', msg: 'Successfully logged in.' });
                this.state.isLoading = false;
                this.$router.replace({ name: 'home' });
            } catch (e) {
                this.pushNotification({ type: 'danger', msg: e.message })
                this.state.password = '';
                this.state.isLoading = false;
            }
        },
        modalToggler() {
            this.state.modalActive = !this.state.modalActive;
        },
        submitForgetPasswordHandler() {
            console.log('Clicked');
        }
    }
}
</script>

<style scoped>
</style>
