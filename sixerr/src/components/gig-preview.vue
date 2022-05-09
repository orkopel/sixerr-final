<template>
  <div class="gig-preview flex" v-if="gig && gigRate">
    <article class="gig-preview-box" @click="goToDetail">
      <div class="gig-img-box">
        <carusel-gigpreview :images="images"></carusel-gigpreview>
      </div>
      <section class="preview-card">
        <div class="seller-info flex">
          <img :src="gigSellerImg" alt="seller image" />
          <span class="seller-name-level">
            <div class="seller-name flex flex-start">
              {{ gig.owner.fullname }}
            </div>
            <div class="seller-level">Level {{ gig.owner.level }} Seller</div>
          </span>
        </div>
      </section>

      <div class="gig-title">{{ gig.title }}</div>
      <div class="gig-rate flex">
        <p class="rating-star-preview"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" width="15" height="15"><path fill="currentColor" d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></svg>{{ avgRate }}</p>
        <p class="rating-length">({{ totalReviews }})</p>
      </div>
      <section class="footer-preview flex space-between">
        <span class="like"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z"></path></svg></span>
        <div class="price flex column">
          <small class="small">Starting at</small>
          <span class="span-price">${{gigPrice}}<sup class="price-cent">{{gigCent}}</sup></span>
        </div>
      </section> 
    </article>
  </div>
</template>

<script>
import { gigService } from "../services/gig.service.js";
import { userService } from "../services/user.service.js";
import caruselGigpreview from "../components/carusel-gigpreview.vue";

export default {
  name: "gig-preview",
  props: {
    gig: Object,
  },
  data() {
    return {
       user: null,
       avgRate:null,
       totalReviews:null,
    }
  },
  components: {
    gigService,
    caruselGigpreview,
  },
  created() {
    this.gigRate()
  },
  computed: {
    gigImg() {
      return this.gig.image;
    },
    gigSellerImg() {
      return this.gig.owner.imgUrl;
    },
    category() {
      return this.gigService.createCatergories();
    },
    images() {
      return this.gig.image;
    },
    gigPrice(){
      return this.gig.price.toFixed(0)
    },
    gigCent(){
      return this.gig.price.toString().split('.')[1]
    },
  },
  methods: {
    goToDetail() {
      this.$router.push(`/gig/${this.gig._id}`);
    },
    async gigRate() {
      const userId = this.gig.owner._id
      const user = await userService.getById(userId)
      this.user = user
        if(!user) return
         const res = user.reviews.reduce((acc, review) => {
          acc += +review.rate;
          return acc;
        }, 0) /user.reviews.length;
        this.totalReviews = user.reviews.length
        this.avgRate = res.toFixed(1);
      return res.toFixed(1);
    }
  },
};
</script>
