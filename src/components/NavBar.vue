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
          <h1>Currencies</h1>
        </a>
        <h1>Login</h1>
        <h1>Register</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  background-color: #5b6467;
  background-image: linear-gradient(315deg, #5b6467 0%, #8b939a 74%);
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-bottom: 2px solid #04d387;
}
.nav-bar-content {
  width: 50%;
  display: flex;
  align-items: center;
}
.nav-bar-content .left {
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-bar-content .right {
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-bar-content h1 {
  margin: 0;
  font-size: 1.2rem;
  margin-right: 1rem;
  color: white;
}
.nav-bar-content img {
  height: 2rem;
  width: 2rem;
  margin-right: 0.5rem;
}
.nav-bar-content h2 {
  margin: 0;
  font-size: 1.5rem;
  font-family: "Permanent Marker", cursive;
  color: white;
}
.line {
  display: flex;
  align-items: center;
}
#green {
  color: #04d387;
}
a {
  text-decoration: none;
}
</style>
