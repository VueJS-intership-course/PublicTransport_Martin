<template>
  <ul class="pagination">
    <li>
      <button @click="previous" :disabled="currentPage === 1">Previous</button>
    </li>
    <li>
      <button @click="goToPage(1)" :disabled="currentPage === 1" :class="{ active: currentPage === 1 }">1</button>
    </li>
    <p v-if="currentPage > 3">...</p>
    <li v-for="pageNumber in visiblePages" :key="pageNumber">
      <button
        @click="goToPage(pageNumber)"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </button>
    </li>
    <p v-if="currentPage < totalPages - 2">...</p>
    <li>
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        :class="{ active: currentPage === totalPages }"
      >
        {{ totalPages }}
      </button>
    </li>
    <li>
      <button @click="next" :disabled="currentPage === totalPages">Next</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    totalPages: Number,
    currentPage: Number,
  },
  computed: {
    visiblePages() {
      const currentPage = this.currentPage;
      const totalPages = this.totalPages;
      const pageNumbers = [];

      if (totalPages <= 5) {
        for (let i = 2; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage <= 3) {
          pageNumbers.push(2, 3, 4);
        } else if (currentPage >= totalPages - 2) {
          pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1);
        } else {
          pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        }
      }

      return pageNumbers;
    },
  },
  methods: {
    goToPage(pageNumber) {
      this.$emit('go-to-page', pageNumber);
    },
    next() {
      if (this.currentPage < this.totalPages) {
        this.$emit('go-to-page', this.currentPage + 1);
      }
    },
    previous() {
      if (this.currentPage > 1) {
        this.$emit('go-to-page', this.currentPage - 1);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
}

.pagination li {
  display: inline-block;
}

.pagination button {
  padding: 5px 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #30b4d2;
}

.pagination button.active {
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
}
</style>
