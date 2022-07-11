<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card card-body mt-5 c-card p-5">
                    <RegisterForm :submitHandler="submitHandler" :data="state.data" :v$="v$" />
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
import { reactive } from 'vue';

export default {
    name: 'Register',
    components: { RegisterForm },
    setup(_props) {
        document.title = 'Register';

        const state = reactive({
            data: {
                nid: '',
                firstName: '',
                lastName: '',
                dob: '',
                email: '',
                password: '',
                confirmPassword: '',
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
                confirmPassword: { required, sameAs: sameAs(state.data.password) }
            }
        });
        const v$ = useVuelidate(rules, state.data);

        return { v$, state };
    },
    methods: {
        async submitHandler() {
            this.v$.$validate();
            if (this.v$.$error) return;

            try {
                const user = await this.$store.dispatch('register', this.state.data);
                console.log(user);
                this.$router.push({ name: 'login' });
            } catch (e) {
                console.log(e.message);
            }

        },
    },
}
</script>

<style scoped>
</style>
