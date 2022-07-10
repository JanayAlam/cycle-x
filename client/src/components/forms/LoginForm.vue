<template>
    <form @submit.prevent="submitHandler">
        <div class="mb-2">
            <label for="email">Email address</label>
            <input type="email" class="form-control" :class="{ 'is-invalid': v$.email.$error }"
                placeholder="i.e. michel@gmail.com" aria-label="Email address" id="email" v-model="data.email" />
            <div class="invalid-feedback" v-if="v$.email.$error">
                <div v-for="error in v$.email.$errors" :key="error.$message">
                    {{ error.$message }}
                </div>
            </div>
        </div>
        <div class="mb-2">
            <label for="password">Password</label>
            <input type="password" class="form-control" :class="{ 'is-invalid': v$.password.$error }"
                placeholder="Enter a strong password" aria-label="password" id="password" v-model="data.password" />
            <div class="invalid-feedback" v-if="v$.password.$error">
                <div v-for="error in v$.password.$errors" :key="error.$message">
                    {{ error.$message }}
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</template>

<script>

export default {
    name: 'LoginForm',
    props: {
        data: Object,
        v$: Object,
        submitHandler: Function,
    },
}
</script>

<style scoped>
</style>
