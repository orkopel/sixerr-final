<template>
  <section class="main-layout">
    <div class="main-grid ">
      <gig-preview v-for="gig in gigs" :gig="gig" :key="gig._id" />
    </div>
  </section>
</template>

<script>
import gigPreview from "./gig-preview.vue";

export default {
  name: "gig-list",
  props: {
    gigs: {
      // type: Array,
        required: true,
    },
  },
  data() {
    return {};
  },
  components: {
    gigPreview,
  },
  methods: {},
  computed: {},
  created() {},
};
</script>
