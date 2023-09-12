<template>
  <div class="layout">
    <Table></Table>
    <MapGermany :journey="journey"></MapGermany>
  </div>
</template>

<script>
import Table from './components/Table.vue';
import MapGermany from './components/MapGermany.vue';
import { default as axios } from 'axios';
export default {
  components: {
     Table, MapGermany 
    },
  data() {
    return {
      journey: [],
      latitude: '',
      longitude: ''
    };
  },
  provide() {
    return {
      info: this.info
    }
  },
  created() {
    axios.get('http://localhost:8080/public-transport/journey/ARR_20230912_23310_1223_0').then((response) => {
      const journey = response.data.ARR_20230912_2201_1015_0;

      for (const stop in journey) {
        this.journey.push(journey[stop].Stops);
      }
    }).catch(err => console.log(err));
  },
};
</script>

<style>
.layout {
  display: flex;
  justify-content: space-around;
}
</style>
