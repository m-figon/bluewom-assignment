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
    <div v-if="!loaded" class="loading">
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
      loaded: false
    };
  },
  created() {
    fetch("https://bluewom-assignment-backend.herokuapp.com/users")
      .then((response) => response.json())
      .then((data) => {
        this.users = data.slice();
        console.log(this.users);
        this.loaded=true;
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
<style>
.login{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  z-index: 5;
}
.login-form{
  border-radius: 10px;
  width: 25rem;
  height: auto;
  background-color: #5b6467;
  background-image: linear-gradient(315deg, #5b6467 0%, #8b939a 74%);  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border: 1px solid #04d387;
}
.login-form-content {
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
}
.login-form-content p {
  margin: 0;
  color:#8b0000;
  font-size: 1rem;
}
.login-form-content input {
  background: rgba(0, 0, 0, 0);
  border: 0;
  border-bottom: 1px solid #04d387;
  width: 100%;
  height: 2rem;
  font-size: 1.2rem;
  color: white;
  margin: 1rem 0;
}
.login-form-content button {
  background: #04d387;
  border-radius: 5px;
  border: 1px solid #a3a3a3;
  width: 4rem;
  height: 2rem;
  font-size: 1.2rem;
  color: white;
  margin: 1rem 0;
}
.login-form-content button:hover {
  background: #04d387;
  cursor: pointer;
}
.x-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.x-button button {
  width: 2rem;
}
</style>