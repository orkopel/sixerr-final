<template>
  <section class="categories-container">
    <h2 class="category-title">Popular professional services</h2>

    <Carousel :items-to-show="5" :wrap-around="true">
      <Slide v-for="category in categories" :key="category.name" style="width: 249px; padding: 0 18px
">
        <li class="category-preview-box" @click="explore(category.name)">
          <div class="category-txt-name-box">
            <small class="category-txt">{{ category.txt }}</small>
            <h4 class="category-name">{{ category.name }}</h4>
          </div>
          <img :src="category.img" alt />
        </li>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
export default defineComponent({
  name: "WrapAround",
  props: {
    categories: {
      type: Array,
    },
  },
  computed: {
    categoryImg() {
      return this.category.img;
    },
  },
  methods: {
    explore(filter) {
      this.$emit("explore", filter);
      this.$router.push(`/explore/${filter}`);
    },
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
});
</script>
<style>
.category-preview-box {
  width: 100%;
  border-radius: 6px;
}






.carousel__slide {
  width: fit-content;
  flex-shrink: -1;
}

.carousel__track li {
    width: 252px;
}

.carousel__slide.carousel__slide--active.carousel__slide--visible {
  width: 252px;
}

li.carousel__slide {
  width: 0px;
}

ol {
  margin: 0px;
  padding: 0px;
}

</style>
