<template>
  <div>
    <navbar class="mb-1" />
    <router-view />
    <notification-list />
  </div>
</template>

<script>
import Navbar from "./components/navigation/Navbar.vue";
import NotificationList from "./components/notification/NotificationList.vue";

export default {
  name: 'App',
  components: { Navbar, NotificationList },
}
</script>

<style>
</style>
