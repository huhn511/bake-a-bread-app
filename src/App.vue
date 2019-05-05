<template>
  <div id="app">
    <h1>Bake a Bread</h1>
    <div v-if="!data">
      <p>Inpout your MAM root</p>
      <textarea v-model="root" placeholder="yor data mam root"></textarea>
      <button @click="loadData()">Show data</button>
    </div>
    <div v-if="data">
      <pre>{{data}}</pre>
    </div>
  </div>
</template>

<script>
import { fetchData } from "./utils/MAM";

export default {
  name: "app",
  data() {
    return {
      data: null,
      root:
        "YQCDJEDJNXKJCZDQ9GFTIKXVUBXXKJYUHVSAWGQULWFPXDGZKMVCGAY9IJCSYFESJIZXTGEANUKENDHIL",
      loading: true
    };
  },
  methods: {
    loadData() {
      let self = this;
      fetchData(this.root).then(function(data) {
        self.data = data;
        self.loading = false;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
