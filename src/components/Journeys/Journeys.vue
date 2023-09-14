<template>
  <div>
    <h3>Journeys</h3>
    <ul>
      <li v-for="(journey, index) in paginatedJourneys" :key="index">
        <router-link :to="'/public-transport/journey/' + journey">
          <button @click="getStations(journey)">{{ journey }}</button>
        </router-link>
      </li>
    </ul>
    <Pagination
      :total-pages="totalPages"
      :current-page="currentPage"
      @go-to-page="goToPage"
    ></Pagination>
  </div>
</template>
<script>
import { fetchDataStations } from '../../services/fetchStations';
import Pagination from '../Pagination/Pagination.vue';

export default {
  props: ['journeysData'],
  components: {
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
      PER_PAGE: 10,
    };
  },
  computed: {
    totalJourneys() {
      return this.journeysData.length;
    },
    totalPages() {
      return Math.ceil(this.totalJourneys / this.PER_PAGE);
    },
    paginatedJourneys() {
      const startIndex = (this.currentPage - 1) * this.PER_PAGE;
      const endIndex = startIndex + this.PER_PAGE;
      return this.journeysData.slice(startIndex, endIndex);
    },
  },
  methods: {
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
    },
    async getStations(id) {
      try {
        const allStations = await fetchDataStations(id);
        const station = Object.values(allStations[id].Stops);
        this.$emit('setStations', station);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
