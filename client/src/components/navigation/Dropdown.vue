<template>
    <div class="nav-item dropdown">
        <button class="btn btn-sm dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Full Name
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
                <router-link class="dropdown-item" to="/">Logout</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'NavigationDropdown',
}
</script>

<style scoped>
.dropdown-menu {
    font-size: 0.9rem;
}
</style>
