<template>
    <div class="nav-item dropdown">
        <button class="btn btn-sm dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            {{ getProfile.firstName }} {{ getProfile.lastName }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                <router-link class="dropdown-item" :to="{ name: 'home' }">Profile Settings</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'home' }">Admin Dashboard</router-link>
            </li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li>
                <router-link to="" class="dropdown-item" @click="logout">Logout</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'NavigationDropdown',
    props: ['logout'],
    computed: {
        ...mapGetters(['getUser', 'getProfile']),
    },
}
</script>

<style scoped>
.dropdown-menu {
    font-size: 0.9rem;
}
</style>
