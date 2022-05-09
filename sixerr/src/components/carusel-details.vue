<template>
  <div class="carousel">
    <vueper-slides
      ref="vueperslides1"
      :touchable="false"
      fade
      :autoplay="false"
      :bullets="false"
      @slide="
        $refs.vueperslides2.goToSlide($event.currentSlide.index, {
          emit: false,
        })
      "
    >
      <vueper-slide v-for="(image, i) in images" :key="i" :image="image">
        <img :src="(image, i)" alt />
      </vueper-slide>
    </vueper-slides>

    <div class="thumbnails">
      <vueper-slides
        class="no-shadow thumbnails"
        ref="vueperslides2"
        @slide="
          $refs.vueperslides1.goToSlide($event.currentSlide.index, {
            emit: false,
          })
        "
        :visible-slides="images.length"
        fixed-height="75px"
        :bullets="false"
        :touchable="false"
        :gap="2.5"
        :arrows="false"
      >
        <vueper-slide
          v-for="(image, i) in images"
          :key="i"
          :image="image"
          @click.native="$refs.vueperslides2.goToSlide(i)"
        >
          <img :src="(image, i)" alt />
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

export default {
  props: ["images"],
  data() {
    return {};
  },
  created() {},
  components: { VueperSlides, VueperSlide },
};
</script>

<style>
.carousel {
  width: 100%;
}

.vueperslides.vueperslide {
  height: 400px;
}

.vueperslides__parallax-wrapper {
  height: 400px;
}

.vueperslides__arrow svg {
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 15%);
  max-width: 16px;
  color: black;
  left: -24px;
}

.thumbnails {
  margin: auto;
  margin-top: 5px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.3;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
  border-color: #000;
}

.thumbnails {
  width: 100%;
}

.vueperslides {
  flex-direction: column;
  display: flex;
}

.vueperslides__arrows svg {
  max-width: 40px;
}
.vueperslides__arrow {
  max-width: 40px;
  opacity: none;
}

.vueperslides__arrow--next {
  right: -15px;
  opacity: none;
}

.vueperslides__arrow--prev {
  left: -30px;
}

@media screen and (max-width: 900px) {
  .vueperslides.vueperslides {
    height: auto;
  }
  .vueperslides__parallax-wrapper {
    height: 300px;
  }


}

@media screen and (max-width: 500px) {
  .vueperslides.vueperslides {
    height: auto;
  }
  .vueperslides__parallax-wrapper {
    height: 200px;
  }
  .vueperslides__arrows svg {
    max-width: 20px;
  }

}
</style>
