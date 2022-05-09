<template>
  <section class="explore-filter main-layout">
    <div class="options-warpper">
      <el-select
        @change="setFilter"
        v-model="filterBy.delivery"
        class="m-2"
        placeholder="Delivery Time"
        size="large"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select multiple class="m-2" size="large" placeholder="Seller Level">
        <el-option v-for="level in optionsForLevel" :key="level.value">
          <el-checkbox
            v-model="filterBy.level"
            @change="setFilter"
            :true-label="level.value"
            :value="level.value"
            :label="level.label"
          />
        </el-option>
      </el-select>
    </div>
  </section>
</template>
<script>
import { ref } from "vue";

export default {
  data() {
    return {
      filterBy: {
        delivery: ref(""),
        title: "",
        category: null,
        level: ref(""),
      },
      options: [
        {
          value: 1,
          label: "Express 24H",
        },
        {
          value: 3,
          label: "Up to 3 days",
        },
        {
          value: 7,
          label: "Up to 7 days",
        },
        {
          value: Infinity,
          label: "Anytime",
        },
      ],
      optionsForLevel: [
        {
          value: 4,
          label: "Seller Level 4",
        },
        {
          value: 3,
          label: "Seller Level 3",
        },
        {
          value: 2,
          label: "Seller Level 2",
        },
        {
          value: 1,
          label: "Seller Level 1",
        },
      ],
    };
  },
  methods: {
    setFilter() {
      const { category } = this.$route.params;
      const delivery = this.filterBy.delivery;
      const level = this.filterBy.level;
      const filterBy = { category,delivery, level };
      this.$emit("setFilter", { ...filterBy });
    },
  },
};
</script>
<style>
.el-select-dropdown__item {
  font-family: Macan-regular;
  color: black;
}

.el-checkbox {
  color: black;
}

.el-input-inner {
  font-size: 16px;
  min-width: 50px;
}
.m-2 {
  position: relative;
}
</style>
