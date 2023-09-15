<template>
  <div>
    <!-- <JourneysComponent></JourneysComponent> -->
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import JourneysComponent from './components/pages/journey/JourneysComponent.vue';

export default {
  components: {
    JourneysComponent,
    RouterView
},
};
</script>
