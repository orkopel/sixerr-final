<template>
  <section @click="closeSignup">
    <hero-cmp />
    <carousel-category
      v-if="categories.length"
      :categories="categories"
      @explore="explore"
      class="main-layout"
    />
    <main-info-cmp />
  </section>
</template>

<script>
import carouselCategory from "../components/carousel-category.vue";
import heroCmp from "../components/hero-cmp.vue";
import mainInfoCmp from "../components/main-info-cmp.vue";

export default {
  name: "gig-app",
  data() {
    return {
      scrollPosition: null,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    explore(filterBy) {
      this.$store.dispatch({ type: "setFilter", filterBy });
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  computed: {
    categories() {
      return this.$store.getters.getCategories;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  components: {
    carouselCategory,
    heroCmp,
    mainInfoCmp,
  },
};
</script>
