<template>
    <div class="d-flex g-2 b-group">
        <router-link :to="{ name: 'login' }" class="primary-clr">Login</router-link>
        <router-link :to="{ name: 'register' }" class="ms-3 primary-clr register">Register</router-link>
    </div>
</template>

<script>
export default {
    name: 'Buttons',
}
</script>

<style scoped>
.b-group {
    font-size: 1rem;
}

.b-group a {
    text-decoration: none;
}

.register {
    text-decoration: underline !important;
    font-weight: 700;
}
</style>
