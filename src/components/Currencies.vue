<template>
  <div class="currencies">
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
    <div v-for="currency in currencies" class="currency">
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
        <button></button>
      </div>
    </div>
    <div class="currency-line">
      <div class="currency-line-left">
        <select>
          <option v-for="item in currencies" v-bind:value="item.code">{{item.currency}}</option>
        </select>
        <button>Add Currency</button>
      </div>
      <div class="currency-line-right">
                  <button>Remove All Currencies</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currencies: [],
      currenciesNames: [],
    };
  },
  created() {
    fetch("http://api.nbp.pl/api/exchangerates/tables/C/")
      .then((response) => response.json())
      .then((data) => {
        this.currencies = data[0].rates.slice();
        console.log(this.currencies);
        for (let item of this.currencies) {
          this.currenciesNames.push(item.currency);
        }
        console.log(this.currenciesNames);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.currencies button {
  height: 2rem;
  border: 1px solid gray;
  background-color: #04d387;
  color: white;
  border-radius: 5px;
}
.currencies button:hover {
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
.currency-line-left{
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.currency-line-right{
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
