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
                    <input v-model="state.emailField" type="email" class="form-control" id="emailField"
                        placeholder="Your email address" :class="{ 'is-invalid': v2$.emailField.$error }" />
                    <div class="invalid-feedback" v-if="v2$.emailField.$error">
                        <div v-for="error in v2$.emailField.$errors" :key="error.$message">
                            {{ error.$message }}
                        </div>
                    </div>
                </div>
                <button v-if="state.isModalBtnLoading" class="btn btn-sm btn-primary" disabled type="submit">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> Sending...
                </button>
                <button v-else class="btn btn-sm btn-primary" type="submit">
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
            isModalBtnLoading: false,
            emailField: '',
        });

        // validations
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(4) },
            }
        });
        const v$ = useVuelidate(rules, state.data);

        const forgetPasswordRules = computed(() => {
            return {
                emailField: { required, email },
            }
        })
        const v2$ = useVuelidate(forgetPasswordRules, state)

        return { v$, state, v2$ };
    },
    methods: {
        ...mapActions(['pushNotification', 'forgetPassword']),
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
        async submitForgetPasswordHandler() {
            this.state.isModalBtnLoading = true;
            this.v2$.$validate();
            if (this.v2$.$error) {
                this.state.isModalBtnLoading = false;
                return;
            }
            try {
                await this.forgetPassword(this.state.emailField);
                this.pushNotification({ type: 'success', msg: 'An email has been sent to your email address. Please check it.' });
                this.state.emailField = '';
                this.state.isModalBtnLoading = false;
                this.modalToggler();
            } catch (e) {
                this.pushNotification({ type: 'danger', msg: e.message });
                this.state.emailField = '';
                this.state.isModalBtnLoading = false;
            }
        }
    }
}
</script>

<style scoped>
</style>
