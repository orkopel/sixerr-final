<template>
  <vueper-slides
    :slide-ratio="0.2"
    :infinite="false"
    disable-arrows-on-edges
    bullets-outside
    :disable="slideshowDisabled"
  >
    <vueper-slide
      v-for="(review, i) in user.reviews"
      :key="i"
      :title="review.txt"
      :image="review.by.imgUrl"
      :content="review.by.fullname"
      :style="'background-color: ' + ['#ffffff']"
    />
  </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  props: ["user"],
  data() {
    return {
      slides: [
        {
          title: "Slide 1",
          content: "Slide 1 content.",
        },
        {
          title: "Slide 2",
          content: "Slide 2 content.",
        },
      ],
    };
  },
   created() {
  },
  methods: {
    appendSlide() {
      this.slides.push({
        content: `Programmagically appended slide ${
          this.slides.length + 1
        } content.`,
        title: `Programmagically appended slide ${this.slides.length + 1}`,
        img: `Programmagically appended slide ${
          this.slides.length + 1
        } content.`,
      });
    },
    removeSlide() {
      this.slides.pop();
    },
    toggleSlideshow() {
      this.slideshowDisabled = !this.slideshowDisabled;
    },
  },
  computed: {

  },
  components: {
    VueperSlides,
    VueperSlide,
  },
};
</script>

<style>
.vueperslides__track-inner {
  justify-content: none;
}

.vueperslides__bullets.vueperslides__bullets--outside {
  display: none;
}
.vueperslides:not(.no-shadow):not(.vueperslides--3d)
  .vueperslides__parallax-wrapper:before {
  z-index: 0;
}

.vueperslides:not(.no-shadow):not(.vueperslides--3d)
  .vueperslides__parallax-wrapper:after {
  z-index: 0;
}
.vueperslide__title {
  font-family: Macan-regular;
  color: #62646a;
  display: block; /* or inline-block */
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  max-height: 3.6em;
  line-height: 1.8em;
}

.vueperslide__content-wrapper {
  padding: 16px 24px;
  border: 1px solid #e4e5e7;
  border-radius: 4px px;
}


.vueperslides__arrow.vueperslides__arrow--next {
  opacity: inherit;
}
.vueperslides__arrow.vueperslides__arrow--prev {
  opacity: inherit;
}
</style>

