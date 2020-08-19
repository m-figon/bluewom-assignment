<template>
  <div id="app">
    <nav-bar></nav-bar>
    <login v-if="login" />
    <register v-if="register" />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";

import store from "./store/index";

export default {
  name: "App",
  store,
  components: {
    "nav-bar": NavBar,
    'login': Login,
    'register': Register
  },
  data() {
    return {
      login: false,
      register: false,
    };
  },
  created() {
    setInterval(() => {
      this.login = this.$store.state.login;
      this.register = this.$store.state.register;
    }, 500);
  },
};
</script>

<style>
#app {
  margin: 0;
}
body {
  margin: 0;
  font-family: "Lato", sans-serif;
  background-color: rgb(218, 218, 218);
}
</style>
