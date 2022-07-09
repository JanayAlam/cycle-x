<template>
    <form @submit.prevent="submitHandler">
        <div class="row mb-2">
            <div class="col">
                <label for="firstName">First name</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }"
                    placeholder="i.e. Michel" aria-label="First name" id="firstName" v-model="data.firstName" />
                <div class="invalid-feedback">
                    {{ errors.firstName }}
                </div>
            </div>
            <div class="col">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }"
                    placeholder="i.e. Jackson" aria-label="Last name" id="lastName" v-model="data.lastName" />
                <div class="invalid-feedback">
                    {{ errors.lastName }}
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <label for="email">Email address</label>
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                    placeholder="i.e. michel@gmail.com" aria-label="Email address" id="email" v-model="data.email" />
                <div class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <label for="password">Password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': errors.password }"
                    placeholder="Enter a strong password" aria-label="password" id="password" v-model="data.password" />
                <div class="invalid-feedback">
                    {{ errors.password }}
                </div>
            </div>
            <div class="col">
                <label for="c-password">Confirm password</label>
                <input type="password" class="form-control" :class="{ 'is-invalid': errors.confirmPassword }"
                    placeholder="Retype password" aria-label="c-password" id="c-password"
                    v-model="data.confirmPassword" />
                <div class="invalid-feedback">
                    {{ errors.confirmPassword }}
                </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <label for="nid">National ID card</label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.nid }"
                    placeholder="i.e. 5110366480" aria-label="nid" id="nid" v-model="data.nid" />
                <div class="invalid-feedback">
                    {{ errors.nid }}
                </div>
            </div>
            <div class="col">
                <label for="dob">Date of birth</label>
                <input type="date" class="form-control" :class="{ 'is-invalid': errors.dob }" placeholder="i.e. Jackson"
                    aria-label="dob" id="dob" v-model="data.dob" />
                <div class="invalid-feedback">
                    {{ errors.dob }}
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</template>

<script>

export default {
    name: 'RegisterForm',
    props: ['data', 'errors', 'submitHandler'],
}
</script>

<style scoped>
</style>
