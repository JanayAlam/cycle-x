<template>
    <nav class="navbar navbar-expand-lg navbar-light navigation-bar bg-dark-white">
        <div class="container bg-dark-white">
            <router-link :to="{ name: 'home' }" class="navbar-brand primary-clr">CycleX</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="ms-auto">
                    <Dropdown v-if="isAuthenticated" :logout="accountLogout" />
                    <AuthButtons v-else />
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import AuthButtons from '@/components/navigation/AuthButtons.vue';
import Dropdown from '@/components/navigation/Dropdown.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Navbar',
    components: { Dropdown, AuthButtons },
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
        ...mapActions(['logout']),
        accountLogout() {
            this.logout();
            this.$router.replace({ name: 'login' });
        },
    },
    setup() {
        return {}
    }
}
</script>

<style scoped>
.navigation-bar {
    min-height: 50px;
    box-shadow: 0 2px 4px 0 #dfdfdf;
}

.navbar-brand {
    font-weight: 800;
    font-size: 1.3rem;
}

.navbar-nav {
    text-transform: uppercase;
}
</style>
