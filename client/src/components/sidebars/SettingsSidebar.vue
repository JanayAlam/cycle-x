<template>
    <div class="list-group">
        <router-link :to="{ name: 'profile-settings' }" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'profile-settings' }" aria-current="true">
            <font-awesome-icon icon="fa-solid fa-user-gear" />
            <span class="ms-2">Profile Details</span>
        </router-link>
        <router-link to="#" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'verify-email' }">
            <font-awesome-icon icon="fa-solid fa-user-check" />
            <span class="ms-2">Verify Email Address</span>
        </router-link>
        <router-link to="#" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'change-user' }">
            <font-awesome-icon icon="fa-solid fa-at" />
            <span class="ms-2">Change Email or NID</span>
        </router-link>
        <router-link to="#" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'change-password' }">
            <font-awesome-icon icon="fa-solid fa-key" />
            <span class="ms-2">Change Password</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SettingsSidebar',
    props: {
        active: String,
    },
    setup(_props) {

        return {};
    },
}
</script>

<style scoped>
.list-group-item {
    font-size: 0.95rem;
    padding-top: 15px;
    padding-bottom: 15px;
    /* text-align: center; */
    border: 0;
    background-color: transparent;
    font-weight: bold;
    border-radius: 5px;
}

.active,
.list-group-item:hover {
    background-color: #dff1fc;
    color: #072A53;
}

.list-group-item:hover {
    text-decoration: underline;
}
</style>
