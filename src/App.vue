<template>
  <div class="layout">
    <Journeys :journeysData="journeys" @set-stations="setStations"></Journeys>
    <MapComponent
      v-if="isLoading"
      :stationsData="stations"
    ></MapComponent>
  </div>
</template>
<!-- :isSelectedJourney="selectedJourney" -->
<script>
import Journeys from './components/Journeys/Journeys.vue';
import MapComponent from './components/Map/MapComponent.vue';
// import { fetchDataStations } from './services/fetchStations.js';
import { fetchDataJourneys } from './services/fetchJourneys.js';

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
      selectedJourney: null //
    };
  },
  watch: {
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
      //   const stations = await fetchDataStations();
      //   this.stations = Object.values(stations);
      //   console.log('stations:', this.stations);

        const journey = await fetchDataJourneys();
        this.journeys = Object.keys(journey);
        // console.log('journeys:', this.journeys);

        this.isLoading = true;
      } catch (err) {
        console.error(err);
      }
    },
    setStations(id) {
      this.stations = id;
    },
    // selectJourney(journey) {
    //   this.selectedJourney = journey
    // }
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
</style>
