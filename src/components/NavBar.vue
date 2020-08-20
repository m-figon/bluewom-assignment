<template>
  <div class="nav-bar">
    <div class="nav-bar-content">
      <div class="left">
        <a href="#/">
          <img src="../assets/logo.png" />
        </a>
        <div class="line">
          <a href="#/">
            <h2>Currency</h2>
          </a>
          <a href="#/">
            <h2 id="green">Checker</h2>
          </a>
        </div>
      </div>
      <div class="right">
        <a href="#/currencies">
          <h1 v-if="logedAc!==''">{{logedAc}}'s Currencies</h1>
        </a>
        <div v-if="logedAc===''">
          <h1 v-on:click="login()">Sign in</h1>
        </div>
        <div v-else>
          <h1 v-on:click="signOut()">Sign out</h1>
        </div>
        <h1 v-on:click="register()">Sign up</h1>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  store,
  data() {
    return {
      logedAc: "",
    };
  },
  created() { //refreshing logged account state
    setInterval(() => {
      this.logedAc = this.$store.state.user.logedUser;
    }, 500);
  },
  methods: {
    signOut() { //setting logged account value to ''
      this.$store.commit("changeName", "");
    },
    login() { //showing login pop-up
      this.$store.commit("changeLogin", true);
      this.$store.commit("changeRegister", false);
    },
    register() { //showing register pop-up
      this.$store.commit("changeRegister", true);
      this.$store.commit("changeLogin", false);
    },
  },
};
</script>

<style src="../style.css">

</style>
