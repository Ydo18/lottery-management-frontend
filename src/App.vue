<template>
  <div id="app">
    <component :is="currentComponent" />
  </div>
</template>

<script>
import LoginLottery from './components/LoginLottery.vue';
import LotteryResults from './components/LotteryResults.vue';
import ConfigParameters from './components/ConfigParameters.vue';

export default {
  name: 'App',
  components: {
    LoginLottery,
    LotteryResults,
    ConfigParameters
  },
  data() {
    return {
      currentComponent: 'LoginLottery'
    };
  },
  created() {
    const path = window.location.pathname;
    if (path === '/home') {
      this.currentComponent = 'ConfigParameters';
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>