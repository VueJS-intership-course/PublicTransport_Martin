<template>
  <div>
    <h3>Table</h3>
    <ul>
      <li>{{ journey }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ['info'],
  data() {
    return {
      journey: this.info
    }
  }
}
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
</style>