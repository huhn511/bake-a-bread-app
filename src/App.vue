<template>
  <div id="app">
    <h1>Bake a Bread</h1>
    <div v-if="!data">
      <p>Inpout your MAM root</p>
      <textarea v-model="root" placeholder="yor data mam root"></textarea>
      <button @click="loadData()">Show data</button>
    </div>
    <div v-if="data">
        <line-chart :data="data" />
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
        "KQYUAAFFUJYOXOYAV9CUZZUWSEVRKXQZPKTZIJMIKXBSEC9BXARVHSDQVZWLGRBCX9OXZHNBZZBMCUWHL",
      loading: true
    };
  },
  methods: {
    loadData() {

      /*
      data = [
        {name: 'sensor-1', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
        {name: 'sensor-2', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
        {name: 'sensor-3', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}}
      ];
      */

      fetchData(this.root).then((snapshots) => {
       this.data = snapshots
        this.loading = false;
      }).then(() => {
        this.parseData()
      });
    },
    parseData() {
      const result1 = {} 
      const result2 = {} 
      const result3 = {} 

      this.data.forEach( entry => {
        const data1 = entry.data["CB:70:0C:86:6C:59"]
        if (data1) {
          let timestamp = new Date(entry.timestamp)
          result1[timestamp] = data1.temperature
        }
        const data2 = entry.data["D7:71:9C:DB:33:83"]
        if (data2) {
          let timestamp = new Date(entry.timestamp)
          result2[timestamp] = data2.temperature
        }
        const data3 = entry.data["EE:AC:B1:8F:44:9D"]
        if (data3) {
          console.log("entry.timestamp", entry.timestamp)
          let timestamp = new Date(entry.timestamp)
          result3[timestamp] = data3.temperature
        }
      })
      const sensor1 = {
        name: "CB:70:0C:86:6C:59",
        data: result1
      } 
      const sensor2 = {
        name: "D7:71:9C:DB:33:83",
        data: result2
      } 
      const sensor3 = {
        name: "EE:AC:B1:8F:44:9D",
        data: result3
      } 

      const result = [sensor1, sensor2, sensor3]
      console.log("result", result)
      this.data = result
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
