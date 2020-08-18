<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components:{
    'nav-bar': NavBar
  }
}
</script>

<style>
#app{
  margin:0;
}
body{
  margin:0;
  font-family: 'Lato', sans-serif;
    background-color: rgb(218, 218, 218);
}
</style>
