<template>
  <div>
    <div v-if="!loaded && logedAc!==''" class="loading">
      <img src="../assets/load.gif" />
    </div>
    <div v-if="confirm1" class="confirm">
      <div class="confirm-content">
        <h1>Are you sure you want to delete this item?</h1>
        <div class="confirm-content-line">
          <div class="left">
            <button v-on:click="deleteCurrency(index)">Yes</button>
          </div>
          <div class="right">
            <button v-on:click="showConfirm('1',false,null)">No</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="confirm2" class="confirm">
      <div class="confirm-content">
        <h1>Are you sure you want to delete all items?</h1>
        <div class="confirm-content-line">
          <div class="left">
            <button v-on:click="deleteAllCurrencies()">Yes</button>
          </div>
          <div class="right">
            <button v-on:click="showConfirm('2',false,null)">No</button>
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
          <button v-on:click="showConfirm('1',true,index)"></button>
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
          <button v-show="userCurrencies.length>0" v-on:click="showConfirm('2',true,null)">Remove All Currencies</button>
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
          <button  v-on:click="addCurrency()">Add Currency</button>
        </div>
        <div class="currency-line-right">
          <button v-show="userCurrencies.length>0" v-on:click="showConfirm(2,true,null)">Remove All Currencies</button>
        </div>
      </div>
    </div>
    <div v-if="logedAc===''" class="currencies">
      <div class="loged-text">
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
      confirm1: false,
      confirm2: false,
      index: null,
      loaded:false
    };
  },
  created() {
    setInterval(() => {
      this.logedAc = this.$store.state.user.logedUser; //refreshing logged account state
      if (this.logedAc !== "" && this.firstFetch) { //if there was not any fetch before get data
        fetch("https://bluewom-assignment-backend.herokuapp.com/users")
          .then((response) => response.json())
          .then((data) => {
            let users = data;
            for (let item of users) {
              if (item.account === this.logedAc) {
                this.logedUser = item;
                this.userCurrencies = item.currencies;
                this.firstFetch = false;
                this.loaded=true
              }
            }
          });
      }
    }, 500);
    fetch("https://api.nbp.pl/api/exchangerates/tables/C") //get currency data
      .then((response) => response.json())
      .then((data) => {
        this.currencies = data[0].rates.slice();
      });
  },
  methods: {
    fetchData() {
      fetch("https://bluewom-assignment-backend.herokuapp.com/users") //get users data from Heroku server
        .then((response) => response.json())
        .then((data) => {
          let users = data;
          for (let item of users) {
            if (item.account === this.logedAc) {
              this.logedUser = item;
              this.userCurrencies = item.currencies;
            }
          }
        });
    },
    login() { //show login pop-up
      this.$store.commit("changeLogin", true);
      this.$store.commit("changeRegister", false);
    },
    register() { //show register pop-up
      this.$store.commit("changeRegister", true);
      this.$store.commit("changeLogin", false);
    },
    showConfirm(num,value,item) { //show confirm pop-up
      if(num==='1'){
        this.confirm1=value;
      }else if(num==='2'){
        this.confirm2=value;
      }
      this.index=item;
    },
    addCurrency() { //add new currency to users currencies property
      let tmpCurrency = this.userCurrencies.slice();
      for (let item of this.currencies) {
        if (item.code === this.currency) {
          tmpCurrency.push(item);
        }
      }
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
    deleteCurrency(index) { //delete one currency from users currencies property
      let tmpCurrency = this.userCurrencies.slice();
      tmpCurrency.splice(index, 1);
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
        this.fetchData(); //refresh data
        this.showConfirm('1',false,null); //hide confirm pop-up
      });
    },
    deleteAllCurrencies() { //delete all currencies from users currencies property
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
        this.fetchData(); //refresh data
        this.showConfirm('2',false,null); //hide confirm pop-up
      });
    },
  },
};
</script>

<style src="../style.css">

</style>
