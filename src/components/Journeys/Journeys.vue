<template>
  <div>
    <h3>Journeys</h3>
    <ul>
      <li v-for="(journey, index) in journeysData" :key="index">
        <p>
          {{ journey }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['journeysData'],
};
</script>

<style scoped>
div {
  width: 50%;
  height: 600px;
  margin-right: 25px;
}

ul {
  list-style: none;
}

p {
  /* border: 1px solid green; */
  background-color: rgba(114, 107, 107, 0.26);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(151, 139, 139, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
</style>
