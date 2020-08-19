<template>
  <div class="login">
    <div class="login-form">
      <div class="login-form-content">
        <div class="x-button">
          <button v-on:click="quit()">X</button>
        </div>
        <input
          v-model="account"
          v-on:focus="focusFunc('Account Name',$event,false)"
          v-on:blur="blurFunc('Account Name',$event,false)"
        />
        <p v-bind:style="[accountId ? {'display':'block'} : {'display':'none'}]">Invalid user data</p>
        <input
          v-model="password"
          v-bind:type="type"
          v-on:focus="focusFunc('Password',$event,true)"
          v-on:blur="blurFunc('Password',$event,true)"
        />
        <button v-on:click="login()">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  store,
  data() {
    return {
      account: "Account Name",
      password: "Password",
      type: "text",
      users: [],
      accountId: false,
    };
  },
  created() {
    fetch("https://bluewom-assignment-backend.herokuapp.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.users = data.slice();
        console.log(this.users);
      });
  },
  methods: {
    focusFunc(text, event, condition) {
      let texts = ["Account Name", "Password"];
      let states = ["this.account", "this.password"];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== text")) {
          eval(states[i] + " = ''");
        }
      }
      if (condition) {
        this.type = "password";
      }
    },
    blurFunc(text, event, condition) {
      let texts = ["Account Name", "Password"];
      let states = ["this.account", "this.password"];
      for (let i = 0; i < texts.length; i++) {
        if (text === texts[i] && eval(states[i] + "=== ''")) {
          eval(states[i] + " = text");
          if (condition) {
            this.type = "text";
          }
        }
      }
    },
    inputsReset() {
      this.accountId = false;
      this.account = "Account Name";
      this.type = "text";
      this.password = "Password";
    },
    login() {
      let correct = false;
      for (let item of this.users) {
        if (item.account === this.account && item.password === this.password) {
          this.$store.commit("changeName", this.account);
          this.inputsReset();
          alert("login completed");
          correct = true;
        }
      }
      if (!correct) {
        this.accountId = true;
      }
    },
    quit() {
      this.$store.commit("changeLogin", false);
    },
  },
};
</script>
<style src="../style.css">

</style>