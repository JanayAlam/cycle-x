<template>
    <div class="nav-item dropdown">
        <button class="btn btn-sm dropdown-toggle d-flex justify-content-center align-items-center dark-white"
                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="profile.profilePhoto" alt="Profile Photo" class="rounded-circle me-1" height="25" width="25"/>
            <span>{{ profile.firstName }} {{ profile.lastName }}</span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                <router-link class="dropdown-item" :to="{ name: 'profile-settings' }">Profile Settings</router-link>
            </li>
            <li>
                <router-link class="dropdown-item" :to="{ name: 'dashboard' }">Admin Dashboard</router-link>
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
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: 'NavigationDropdown',
    props: ['logout'],
    setup() {
        const store = useStore();
        const profile = computed(() => {
            return store.getters.getProfile
        });
        const user = computed(() => {
            return store.getters.getUser
        });
        return { profile, user }
    },
}
</script>

<style scoped>
.dropdown-menu {
    font-size: 0.9rem;
}
</style>
