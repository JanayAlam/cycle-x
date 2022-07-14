<template>
    <div class="d-flex g-2 b-group">
        <router-link :to="{ name: 'login' }" class="dark-white"
            :class="{ 'active': getAuthButtonActive.includes('login') }">Login
        </router-link>
        <router-link :to="{ name: 'register' }" class="ms-3 dark-white"
            :class="{ 'active': getAuthButtonActive.includes('register') }">Register</router-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AuthButtons',
    computed: {
        ...mapGetters(['getAuthButtonActive']),
    },
}
</script>

<style scoped>
.b-group {
    font-size: 1rem;
}

.b-group a {
    text-decoration: none;
}

.active {
    text-decoration: underline !important;
    font-weight: 700;
}
</style>
