<template>
    <div class="container a-dashboard">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <admin-sidebar active="system-users" />
            </div>
            <div class="a-dashboard-main col-md-9 col-sm-8">
                <div v-for="profile in profiles" :key="profile.id">
                    <div class="card c-card w-100">
                        <div class="card-body">
                            <div class="card-title d-flex align-items-center">
                                <img
                                    :src="profile.profilePhoto"
                                    alt="Profile"
                                    height="70"
                                    class="rounded"
                                />
                                <h1 class="display-6 ms-2">
                                    {{ profile.firstName }}
                                    {{ profile.lastName }}
                                </h1>
                            </div>
                            <p class="card-text mt-4">
                                Date of Birth: {{ profile.dob }}
                            </p>
                            <hr />
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-success">
                                    <font-awesome-icon
                                        icon="fa-solid fa-timeline"
                                    />
                                    View profile logs
                                </button>
                                <button class="btn btn-sm btn-danger ms-2">
                                    <font-awesome-icon
                                        icon="fa-solid fa-microphone-lines-slash"
                                    />
                                    Mute this profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminSidebar from '@/components/sidebars/AdminSidebar.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: 'SystemUsers',
    components: { AdminSidebar },
    created() {
        this.$store.dispatch('fetchAllProfiles');
    },
    setup() {
        document.title = 'System users';
        const store = useStore();
        const profiles = computed(() => store.getters.getProfiles);
        return { profiles };
    },
};
</script>

<style scoped>
img {
    border-radius: 50% !important;
    border: 2px solid #fff;
}
</style>
