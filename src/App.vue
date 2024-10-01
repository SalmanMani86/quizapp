<template>
  <div id="app">
    <HeaderView v-if="!$route.meta.hideForAuth" />
    <router-view />
  </div>
</template>

<script>
import HeaderView from './components/Header.vue';

export default {
  name: "App",
  components: {  // Use 'components' here, not 'component'
    HeaderView
  }
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
</style>
