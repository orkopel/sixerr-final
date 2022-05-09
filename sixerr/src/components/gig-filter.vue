<template>
  <section class="gig-filter">
    <form class="search-section">
      <img src="../assets/logo/magnifying-glass.png" alt />
      <input
        @change="setFilter"
        v-model="filterBy.title"
        type="text"
        placeholder='Try "building mobile app"'
        class="search"
      />
      <button class="search-btn">Search</button>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      filterBy: {
        title: "",
        category:""
        
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", JSON.parse(JSON.stringify(this.filterBy)));
    },
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
  },
};
</script>