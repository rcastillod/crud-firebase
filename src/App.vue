<template>
  <v-app>
    <navigation v-if="isPrivateRoute"></navigation>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: 'App',
  data: () => ({
    
  }),
  computed: {
    isPrivateRoute() {
      return this.$route.meta.privateRoute  
    }
  },  
  components: {
    'navigation': Navigation
  }
};
</script>

<style lang="scss">
.login,
.register {
  background-image: url('./assets/login-bg.jpg');
  background-size: cover;
  background-position: center center;
  height: 100vh;
}
.form-card {
  backdrop-filter: blur(15px);
}
</style>
