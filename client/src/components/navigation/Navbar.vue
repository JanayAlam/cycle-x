<template>
    <nav
        class="navbar navbar-expand-lg navbar-light navigation-bar bg-success bg-gradient"
    >
        <div class="container rounded navigation-container">
            <router-link :to="{ name: 'home' }" class="navbar-brand dark-white"
                >CycleX</router-link
            >
            <button
                class="navbar-toggler dark-white"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
            <span v-if="isAuthenticated" class="text-light fw-bold">
                <span v-if="profile.rank">{{ profile.rank.rankName }}</span>
                <span v-else>BRONZE</span>
            </span>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="ms-auto">
                    <div
                        v-if="isAuthenticated"
                        class="d-flex justify-content-center align-items-center"
                    >
                        <button class="btn">
                            <font-awesome-icon
                                icon="fa-solid fa-bell"
                                class="dark-white"
                            />
                        </button>
                        <Dropdown :logout="accountLogout" />
                    </div>
                    <AuthButtons v-else />
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import AuthButtons from '@/components/navigation/AuthButtons.vue';
import Dropdown from '@/components/navigation/Dropdown.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';

export default {
    name: 'Navbar',
    components: { Dropdown, AuthButtons },
    setup() {
        const store = useStore();
        const router = useRouter();

        const isAuthenticated = computed(() => store.getters.isAuthenticated);
        const accountLogout = () => {
            store.dispatch('logout');
            store.dispatch('pushNotification', {
                type: 'info',
                msg: 'Logged out.',
            });
            router.replace({ name: 'login' });
        };
        const profile = computed(() => store.getters.getProfile);
        return { isAuthenticated, profile, accountLogout };
    },
};
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

.navigation-container {
    background-color: transparent;
}
</style>
