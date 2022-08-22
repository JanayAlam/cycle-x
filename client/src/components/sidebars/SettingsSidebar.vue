<template>
    <div class="list-group">
        <router-link :to="{ name: 'profile-settings' }" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'profile-settings' }" aria-current="true">
            <font-awesome-icon icon="fa-solid fa-user-gear" />
            <span class="ms-2">Profile Details</span>
        </router-link>
        <router-link :to="{ name: 'email-verify' }" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'email-verify' }">
            <font-awesome-icon icon="fa-solid fa-user-check" />
            <span class="ms-2">Verify Email Address</span>
        </router-link>
        <router-link :to="{ name: 'change-user-info' }" class="list-group-item list-group-item-action"
            :class="{ 'active': active === 'change-user-info' }">
            <font-awesome-icon icon="fa-solid fa-at" />
            <span class="ms-2">Change Email or NID</span>
        </router-link>
        <router-link :to="{ name: 'change-password' }" class="list-group-item list-group-item-action"
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
}
</script>

<style scoped src="@/assets/css/sidebar-styles.css">
</style>
