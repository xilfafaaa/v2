<template>
  <div id="app">
<!--    <router-link to="/login">llllll</router-link><br>-->
<!--    <router-link to="/register">registerregister</router-link><br>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "assets/font.css";
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*font-family: Deng;*/
  color: #000000;
  /*text-align: center;*/
  margin:0 auto;
  width: 100%;
}

</style>
