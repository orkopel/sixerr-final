<template>
  <div class="image-preview">
    <div class="block">
      <el-carousel trigger="click" :autoplay="false" height="184px">
        <el-carousel-item v-for="image in images" :key="image">
          <img :src="image" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "carusel-gigpreview",
  props: {
    images: Array,
  },
  components: {},
  computed: {
  },
};
</script>
