<template>
    <div class="list-group">
        <router-link
            :to="{ name: 'admin-dashboard' }"
            class="list-group-item list-group-item-action"
            :class="{ active: active === 'admin-dashboard' }"
            aria-current="true"
        >
            <font-awesome-icon icon="fa-solid fa-chart-pie" />
            <span class="ms-2">Admin Dashboard</span>
        </router-link>
        <router-link
            :to="{ name: 'admin-hubs' }"
            class="list-group-item list-group-item-action"
            :class="{ active: active === 'admin-hubs' }"
        >
            <font-awesome-icon icon="fa-solid fa-diagram-project" />
            <span class="ms-2">Hubs</span>
        </router-link>
        <router-link
            :to="{ name: 'admin-cycles' }"
            class="list-group-item list-group-item-action"
            :class="{ active: active === 'admin-cycle' }"
        >
            <font-awesome-icon icon="fa-solid fa-person-biking" />
            <span class="ms-2">Cycles</span>
        </router-link>
        <router-link
            :to="{ name: 'system-users' }"
            class="list-group-item list-group-item-action"
            :class="{ active: active === 'system-users' }"
        >
            <font-awesome-icon icon="fa-solid fa-users" />
            <span class="ms-2">System Users</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'AdminSidebar',
    props: {
        active: String,
    },
};
</script>

<style scoped src="@/assets/css/sidebar-styles.css"></style>
