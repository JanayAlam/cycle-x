<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/navigation/Navbar.vue";

export default {
  name: 'App',
  components: { Navbar },
}
</script>

<style>
*,
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #F2F2F2;
}

#app {
  font-size: 14px;
  font-family: 'Roboto', 'Albert Sans', sans-serif;
}

.primary-clr {
  color: #072A53 !important;
}

.bg-dark-white {
  background-color: #EEEEEE !important;
}

.c-card {
  background: #F8F8F8;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
}

.btn-primary {
  background-color: #072A53 !important;
  color: #F8F8F8 !important;
  border: 0;
}
</style>
