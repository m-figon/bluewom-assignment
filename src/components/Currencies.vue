<template>
  <div>
    <div v-if="confirm!==''" class="confirm">
      <div class="confirm-content">
        <h1>{{confirm}}</h1>
        <div class="confirm-content-line">
          <div class="left">
            <button>Yes</button>
          </div>
          <div class="right">
            <button>No</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="logedAc!=='' && userCurrencies.length>0" class="currencies">
      <h2>Your currencies</h2>
      <div class="currency" id="title">
        <div class="item">
          <h1>Currency</h1>
        </div>
        <div class="item">
          <h1>Code</h1>
        </div>
        <div class="item">
          <h1>Ask</h1>
        </div>
        <div class="item">
          <h1>Bid</h1>
        </div>
        <div class="x-item"></div>
      </div>
      <div v-for="(currency,index) in userCurrencies" class="currency">
        <div class="item">
          <h1>{{currency.currency}}</h1>
        </div>
        <div class="item">
          <h1>{{currency.code}}</h1>
        </div>
        <div class="item">
          <h1>{{currency.ask}}</h1>
        </div>
        <div class="item">
          <h1>{{currency.bid}}</h1>
        </div>
        <div class="x-item">
          <button v-on:click="deleteCurrency(index)"></button>
        </div>
      </div>
      <div class="currency-line">
        <div class="currency-line-left">
          <select v-model="currency">
            <option value="none">Select currency</option>
            <option v-for="item in currencies" v-bind:value="item.code">{{item.currency}}</option>
          </select>
          <button v-on:click="addCurrency()">Add Currency</button>
        </div>
        <div class="currency-line-right">
          <button v-on:click="deleteAllCurrencies()">Remove All Currencies</button>
        </div>
      </div>
    </div>
    <div v-if="logedAc!=='' && userCurrencies.length===0" class="currencies">
      <h2>No currencies added</h2>
      <div class="currency-line">
        <div class="currency-line-left">
          <select v-model="currency">
            <option value="none">Select currency</option>
            <option v-for="item in currencies" v-bind:value="item.code">{{item.currency}}</option>
          </select>
          <button v-on:click="addCurrency()">Add Currency</button>
        </div>
        <div class="currency-line-right">
          <button v-on:click="deleteAllCurrencies()">Remove All Currencies</button>
        </div>
      </div>
    </div>
    <div v-if="logedAc===''" class="loged-text">
      <h2>You are not logged</h2>
      <div class="line">
        <h1>To check currencies</h1>
        <h1 id="green" v-on:click="login()">sign in</h1>
      </div>
      <div class="line">
        <h1>Don't have an account?</h1>
        <h1 id="green" v-on:click="register()">sign up</h1>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index";

export default {
  data() {
    return {
      currencies: [],
      userCurrencies: [],
      logedAc: "",
      logedUser: null,
      firstFetch: true,
      currency: "none",
      confirm: "",
    };
  },
  created() {
    setInterval(() => {
      this.logedAc = this.$store.state.user.logedUser;
      if (this.logedAc !== "" && this.firstFetch) {
        fetch("https://bluewom-assignment-backend.herokuapp.com/users")
          .then((response) => response.json())
          .then((data) => {
            let users = data;
            console.log(users);
            for (let item of users) {
              if (item.account === this.logedAc) {
                this.logedUser = item;
                this.userCurrencies = item.currencies;
                console.log(this.userCurrencies);
                this.firstFetch = false;
              }
            }
          });
      }
    }, 500);
    fetch("http://api.nbp.pl/api/exchangerates/tables/C/")
      .then((response) => response.json())
      .then((data) => {
        this.currencies = data[0].rates.slice();
        console.log(this.currencies);
      });
  },
  methods: {
    fetchData() {
      fetch("https://bluewom-assignment-backend.herokuapp.com/users")
        .then((response) => response.json())
        .then((data) => {
          let users = data;
          console.log(users);
          for (let item of users) {
            if (item.account === this.logedAc) {
              this.logedUser = item;
              this.userCurrencies = item.currencies;
              console.log(this.userCurrencies);
            }
          }
        });
    },
    login() {
      this.$store.commit("changeLogin", true);
      this.$store.commit("changeRegister", false);
    },
    register() {
      this.$store.commit("changeRegister", true);
      this.$store.commit("changeLogin", false);
    },
    addCurrency() {
      let tmpCurrency = this.userCurrencies.slice();
      console.log(this.currency);
      for (let item of this.currencies) {
        if (item.code === this.currency) {
          tmpCurrency.push(item);
        }
      }
      console.log(tmpCurrency);
      fetch(
        "https://bluewom-assignment-backend.herokuapp.com/users/" +
          this.logedUser.id,
        {
          method: "PUT",
          body: JSON.stringify({
            email: this.logedUser.email,
            account: this.logedUser.account,
            password: this.logedUser.password,
            currencies: tmpCurrency,
            id: this.logedUser.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then(() => {
        this.fetchData();
      });
    },
    deleteCurrency(index) {
      let tmpCurrency = this.userCurrencies.slice();
      console.log(this.currency);
      tmpCurrency.splice(index, 1);
      console.log(tmpCurrency);
      fetch(
        "https://bluewom-assignment-backend.herokuapp.com/users/" +
          this.logedUser.id,
        {
          method: "PUT",
          body: JSON.stringify({
            email: this.logedUser.email,
            account: this.logedUser.account,
            password: this.logedUser.password,
            currencies: tmpCurrency,
            id: this.logedUser.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then(() => {
        this.fetchData();
      });
    },
    deleteAllCurrencies() {
      fetch(
        "https://bluewom-assignment-backend.herokuapp.com/users/" +
          this.logedUser.id,
        {
          method: "PUT",
          body: JSON.stringify({
            email: this.logedUser.email,
            account: this.logedUser.account,
            password: this.logedUser.password,
            currencies: [],
            id: this.logedUser.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then(() => {
        this.fetchData();
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.confirm {
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
.confirm-content {
  border-radius: 10px;
  width: 20rem;
  height: auto;
  background-color: #5b6467;
  background-image: linear-gradient(315deg, #5b6467 0%, #8b939a 74%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  border: 1px solid #04d387;
  padding-bottom: 1rem;
}
.confirm-content h1 {
  font-size: 1rem;
}
.confirm-content-line {
  width: 100%;
  display: flex;
  align-items: center;
}
.confirm-content-line .left {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.confirm-content-line .right {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.currencies {
  height: calc(100vh - 3rem);
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.currencies select {
  height: 2rem;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 0 0.5rem;
  margin-right: 1rem;
}
.currencies button,
.confirm-content button {
  height: 2rem;
  border: 1px solid gray;
  background-color: #04d387;
  color: white;
  border-radius: 5px;
}
.currencies button:hover,
.confirm-content button:hover {
  cursor: pointer;
}
.currencies h1 {
  margin: 0;
  font-size: 1rem;
}
.currencies h2 {
  margin: 1rem 0;
  font-size: 1.5rem;
  width: 45rem;
  text-align: start;
}
.currency {
  width: 45rem;
  height: 3rem;
  border: 1px solid gray;
  border-top: 0;
  display: flex;
  background-color: white;
}
.currency .item {
  width: 10rem;
  height: 3rem;
  border: 0px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
#title {
  background-color: #5b6467;
  background-image: linear-gradient(315deg, #5b6467 0%, #8b939a 74%);
  color: white;
}
.currency .x-item {
  width: 5rem;
  height: 3rem;
  border: 0px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.x-item button {
  clip-path: polygon(
    20% 0%,
    0% 20%,
    30% 50%,
    0% 80%,
    20% 100%,
    50% 70%,
    80% 100%,
    100% 80%,
    70% 50%,
    100% 20%,
    80% 0%,
    50% 30%
  );
  border: 0;
  width: 1.2rem;
  height: 1.2rem;
  background-color: #04d387;
}
.x-item button:hover {
  cursor: pointer;
}
.currency-line {
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  width: 45rem;
}
.currency-line-left {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.currency-line-right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.loged-text {
  margin-top: 3rem;
  margin-left: 40%;
  width: 15rem;
  height: auto;
  padding: 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
}
.loged-text h2 {
  font-size: 1.5rem;
}
.loged-text h1 {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.line {
  display: flex;
  align-items: center;
}
#green {
  color: #04d387;
}
#green:hover {
  cursor: pointer;
}
</style>
