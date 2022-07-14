<template>
    <div>
        <form @submit.prevent="submitHandler">
            <div class="mb-2">
                <label for="email">Email address</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': v$.email.$error }"
                    placeholder="Enter your email address" aria-label="Email address" id="email" v-model="data.email" />
                <div class="invalid-feedback" v-if="v$.email.$error">
                    <div v-for="error in v$.email.$errors" :key="error.$message">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="mb-2">
                <label for="password">Password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': v$.password.$error }"
                    placeholder="Enter your password" aria-label="password" id="password" v-model="data.password" />
                <div class="invalid-feedback" v-if="v$.password.$error">
                    <div v-for="error in v$.password.$errors" :key="error.$message">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="mb-2 d-flex align-items-center">
                <div>
                    <input class="form-check-input" type="checkbox" value="" id="agreement">
                    <label class="form-check-label ms-1" for="agreement">
                        Remember me
                    </label>
                </div>
                <div class="ms-auto">
                    <span @click="toggler" class="primary-clr modal-link">Forget password</span>
                </div>
            </div>
            <button v-if="data.isLoading" class="btn btn-primary mb-2" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Processing...
            </button>
            <button v-else type="submit" class="btn btn-primary mb-2">
                <font-awesome-icon icon="fa-solid fa-arrow-right-to-bracket" /> Login
            </button>
            <div>
                <router-link class="primary-clr" :to="{ name: 'register' }">
                    Do not have any account? <span class="fw-bold">Register</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>


export default {
    name: 'LoginForm',
    props: {
        data: Object,
        v$: Object,
        submitHandler: Function,
    },
    methods: {
        toggler() {
            this.$emit('toggler');
        }
    }
}
</script>

<style scoped>
a,
form-check-label {
    font-size: 0.9rem;
}

input[type="checkbox"] {
    width: 15px;
    height: 15px;
    padding: 0;
    margin: 0;
    vertical-align: bottom;
    position: relative;
    top: -1px;
}

.modal-link {
    cursor: pointer;
}

.modal-link:hover {
    text-decoration: underline;
}
</style>
