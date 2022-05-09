<template>
  <section class="main-layout">
    <div class="show-category-title">
      <h1 class="category-title-page">{{ displayCategory }}</h1>
      <div class="category-description">
        {{ displayCategoryDescription }}
      </div>
    </div>
    <explore-filter @setFilter="setFilter" />
    <gig-list v-if="gigs" :gigs="gigs" />
  </section>
</template>
<script>
import gigList from "../components/gig-list.vue";
import exploreFilter from "../components/explore-filter.vue";
export default {
  name: "category",
  data() {
    return {
      category: null,
    };
  },
  methods: {
    setFilter(filterBy) {
      this.$store.dispatch({ type: "setFilter", filterBy });
    },
  },
  computed: {
    gigs() {
      return this.$store.getters.getGigs;
    },
    displayCategory() {
      if (this.category === "Arts and Crafts") return "Arts and Crafts";
      else if (this.category === "Video explainers") return "Video explainers";
      else if (this.category === "Write & Translation") return "Write & Translation";
      else if (this.category === "Research and Summeries") return "Research and Summeries";
      else if (this.category === "Marketing") return "Marketing";
      else if (this.category === "Data Entry") return "Data Entry";
      else if (this.category === "Logo design") return "Logo design";
    },
    displayCategoryDescription() {
      if (this.category === "Arts and Crafts")
        return "Beautiful arts & crafts for business or pleasur.";
      else if (this.category === "Video explainers")
        return "Help your audience understand your story with animated explainer videos.";
      else if (this.category === "Write & Translation")
        return "Get your words across—in any language.";
      else if (this.category === "Research and Summeries")
        return "Get the research you need to inform your awesome business ideas.";
      else if (this.category === "Marketing")
        return "Build your brand. Grow your business.";
      else if (this.category === "Data Entry")
        return "Get help with typing and many more data entry services.";
      else if (this.category === "Logo design")
        return "Stand out from the crowd with a logo that fits your brand personality.";
    },
  },
  created() {
    const { category } = this.$route.params;
    this.category = category;
    const filterBy = { category };
    this.$store.dispatch({ type: "setFilter", filterBy });
  },
  components: {
    gigList,
    exploreFilter,
  },
};
</script>
