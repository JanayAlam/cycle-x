<template>
    <div class="nav-item dropdown">
        <button
            class="btn btn-sm dropdown-toggle d-flex justify-content-center align-items-center dark-white"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                :src="profile.profilePhoto"
                alt="Profile Photo"
                class="rounded-circle me-1"
                height="25"
                width="25"
            />
            <span class="name"
                >{{ profile.firstName }} {{ profile.lastName }}</span
            >
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
                <router-link class="dropdown-item" :to="{ name: 'dashboard' }"
                    ><font-awesome-icon icon="fa-solid fa-chart-line" /><span class="ms-1">Dashboard</span></router-link
                >
            </li>
            <li>
                <router-link
                    class="dropdown-item"
                    :to="{ name: 'profile-settings' }"
                    ><font-awesome-icon icon="fa-solid fa-user" />
                    <span class="ms-1">Profile Settings</span></router-link
                >
            </li>

            <li>
                <hr class="dropdown-divider" />
            </li>
            <li>
                <router-link
                    to=""
                    class="dropdown-item btn-logout"
                    @click="logout"
                >
                    <div class="d-flex align-items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-box-arrow-left"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                            />
                            <path
                                fill-rule="evenodd"
                                d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                            />
                        </svg>
                        <span class="ms-1">Logout</span>
                    </div>
                </router-link>
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
            return store.getters.getProfile;
        });
        const user = computed(() => {
            return store.getters.getUser;
        });
        return { profile, user };
    },
};
</script>

<style scoped>
.dropdown-menu {
    font-size: 0.9rem;
}

button,
button:hover,
button:focus {
    background-color: #d7f3d733;
    border: 0;
}

.btn-logout:hover,
.btn-logout:active {
    background-color: rgba(248, 32, 32, 0.726);
    color: #f8f8f8;
    border: 0;
}

li a {
    padding-top: 8px;
    padding-bottom: 8px;
}

li a:hover,
li a:active {
    background-color: #d7f3d7;
    color: black;
}

ul {
    min-width: 250px;
}
</style>
