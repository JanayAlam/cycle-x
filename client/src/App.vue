<template>
  <div>
    <NavbarVue />
    <router-view></router-view>
  </div>
</template>

<script>
import NavbarVue from "./components/Navbar.vue";

export default {
  name: 'App',
  components: { NavbarVue },
}
</script>

<style>
#app {
  font-size: 12px;
  font-family: 'Roboto', 'Albert Sans', sans-serif;
}
</style>
