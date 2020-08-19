<template>
  <div class="home">
    <div v-if="logedAc===''" class="home-text">
      <h2>Welcome to CurrencyChecker!</h2>
      <div class="line">
        <h1>To check currencies</h1>
        <h1 id="green" v-on:click="login()">sign in</h1>
      </div>
      <div class="line">
        <h1>Don't have account?</h1>
        <h1 id="green" v-on:click="register()">sign up</h1>
      </div>
    </div>
    <div v-if="logedAc!==''" class="home-text">
      <h1>Welcome to CurrencyChecker {{logedAc}}!</h1>
      <a href="#/currencies">
        <h1 id="green">Check your currencies</h1>
      </a>
    </div>
    <div v-if="!loaded" class="loading">
      <img src="../assets/load.gif" />
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
      loaded: false
    };
  },
  created() {
    setInterval(() => {
      this.logedAc = this.$store.state.user.logedUser;
    }, 500);
  },
  mounted: function () {
  this.$nextTick(function () {
    this.loaded=true;
  })
  },
  methods: {
    login() {
      this.$store.commit("changeLogin", true);
      this.$store.commit("changeRegister", false);
    },
    register() {
      this.$store.commit("changeRegister", true);
      this.$store.commit("changeLogin", false);
    },
  },
};
</script>

<style src="../style.css">
</style>
