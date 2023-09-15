<template>
  <div>
      <div class="layout" v-if="isLoading">
        <Journeys
          :journeysData="journeys"
          @setStations="setStations"
          :stationId="id"
        ></Journeys>
        <MapComponent :stationsData="stations"></MapComponent>
      </div>
      <div v-else class="loading">
        <p>Loading...</p>
      </div>
  </div>
</template>

<script>
import Journeys from '../../Journeys/Journeys.vue';
import MapComponent from '../..//Map/MapComponent.vue';
import { fetchDataJourneys } from '../../../services/fetchJourneys';

export default {
  props: {
    id: {
      type: String,
    }
  },
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
    id: function (newId) {
      console.log(newId);
    }
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
    setStations(stations) {
      this.stations = stations;
      console.log(stations);
    },
  },
  created() {
    this.fetchDataAndUpdate();
    console.log(this.id);
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
