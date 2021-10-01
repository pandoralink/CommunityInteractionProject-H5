<template>
  <div id="app">
    <new-edit />
  </div>
</template>

<script>
import NewEdit from './components/NewEdit.vue'

export default {
  name: 'App',
  components: {
    NewEdit
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
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
