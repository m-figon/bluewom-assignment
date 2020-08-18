<template>
  <div class="home">
    <div class="home-text">
      <h2>Welcome to CurrencyChecker!</h2>
      <div class="line">
        <h1>To check currencies</h1>
        <h1 id="green">sign in</h1>
      </div>
      <div class="line">
        <h1>Don't have account?</h1>
        <h1 id="green">sign up</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: calc(100vh - 3rem);
  width: 100vw;
  background: url("../assets/home.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-text {
  margin-left: 40%;
  width: 15rem;
  height: 15rem;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
}
.home-text h2 {
  font-size: 1.5rem;
}
.home-text h1 {
  font-size: 1rem;
  margin-right: 0.5rem;
}
.line{
    display: flex;
    align-items: center;
}
#green{
    color:#04d387;
}
#green:hover{
    cursor: pointer;
}
</style>
