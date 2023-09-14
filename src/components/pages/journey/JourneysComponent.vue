<template>
  <div>
    <RouterView>
      <div class="layout" v-if="isLoading">
        <Journeys
          :journeysData="journeys"
          @setStations="setStations"
        ></Journeys>
        <MapComponent :stationsData="stations"></MapComponent>
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
    </RouterView>
  </div>
</template>

<script>
import Journeys from '../../Journeys/Journeys.vue';
import MapComponent from '../..//Map/MapComponent.vue';
import { fetchDataJourneys } from '../../../services/fetchJourneys';

export default {
  components: {
    Journeys,
    MapComponent,
  },
  data() {
    return {
      stations: [],
      isLoading: false,
      journeys: [],
    };
  },
  watch: {
    //TODO: set on MapCompoennt
    isLoading(newVal) {
      if (newVal === true) {
        console.log('isLoading: ' + newVal);
      } else {
        console.log('isLoading is false');
      }
    },
  },
  methods: {
    async fetchDataAndUpdate() {
      try {
        const journey = await fetchDataJourneys();
        this.journeys = Object.keys(journey);

        this.isLoading = true;
      } catch (err) {
        console.error(err);
      }
    },
    setStations(id) {
      this.stations = id;
    },
  },
  created() {
    this.fetchDataAndUpdate();
  },
};
</script>

<style>
.layout {
  display: flex;
  justify-content: space-around;
}

.paragraph {
  font-size: 30px;
  text-align: center;
  margin-top: 300px;
}

.loading {
  font-size: 30px;
}
</style>
