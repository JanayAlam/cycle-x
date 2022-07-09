<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card card-body mt-5 c-card p-5">
                    <RegisterForm :submitHandler="submitRegistrationHandler" :data="data" :errors="errors" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisterForm from '@/components/forms/RegisterForm';

export default {
    name: 'Register',
    components: { RegisterForm },
    created() {
        document.title = 'Register';
    },
    data() {
        return {
            errors: {},
            data: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                nid: '',
                dob: new Date(),
            },
        }
    },
    methods: {
        validate() {
            this.errors.firstName = 'First name is required';
            this.errors.lastName = 'Last name is required';
            this.errors.email = 'Email is required';
        },
        submitRegistrationHandler() {
            this.validate();
            console.log(this.data);
        }
    }
}
</script>

<style scoped>
</style>
