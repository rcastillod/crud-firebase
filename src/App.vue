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

/** Global */
body {
  color: #170035;
}

/** Login & Register Form */
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
.sign-link {
  cursor: pointer;
  transition: color 300ms ease-in-out;
  &:hover {
    color: #170035 !important;
  }
}
</style>
