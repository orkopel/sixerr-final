<template>
  <section v-if="gig" class="gig-page main-layout">
    <div class="info-side">
      <div class="details-title-info">
        <h1>{{ gig.title }}</h1>
        <div class="seller-info">
          <div class="profile-img">
            <img :src="gigSellerImg" alt="seller image" class="seller-img" />
          </div>
          <p class="owner-name">{{ gig.owner.fullname }}</p>
          <p>Level {{ gig.owner.level }} Seller</p>
          |
          <div v-if="gig.owner.rate">
            <span class="stars-details"
              >{{ getStars }} 4
              <p class="review-length">({{ reviewLength }})</p></span
            >
          </div>
        </div>
      </div>
      <carusel-details :images="images"></carusel-details>
          <div class="check-out-section-mobile">
      <div class="check-out-part">
        <div class="checkout-title">
          <p class="service">{{ gig.category }}</p>
          <p class="price">${{ gig.price }}</p>
        </div>
        <div class="additional-info">
          <div class="delivery-wrapper">
            <div class="img-clock">
              <img src="../assets/logo/clock.png" alt />
              <p>{{ gig.daysToMake }} &nbsp;Days Delivery</p>
            </div>
          </div>
          <div class="revision-wrapper">
            <img src="../assets/logo/cycle.png" alt />
            <p>{{ gig.daysToMake }} &nbsp;Revisions</p>
          </div>
        </div>
        <div class="promises-section">
          <div class="guarentee-section">
            <div class="v-image">
              <img
                src="../assets/logo/icons8-done-48.png"
                class="v-details"
                alt=""
              />
            </div>
            <p>High quality product guarenteed</p>
          </div>
          <div class="guarentee-section">
            <div class="v-image">
              <img
                src="../assets/logo/icons8-done-48.png"
                class="v-details"
                alt=""
              />
            </div>
            <p>Delivery on time guarentee</p>
          </div>
          <div class="guarentee-section">
            <div class="v-image">
              <img
                src="../assets/logo/icons8-done-48.png"
                class="v-details"
                alt=""
              />
            </div>
            <p>1 Product</p>
          </div>
        </div>
        <div class="buy-btn">
          <button @click="addOrder">Continue (${{ gigPrice }})</button>
        </div>
      </div>
    </div>

      <div class="about-gig">
        <p class="about-title">About This Gig</p>
        <p class="about-text">{{ gig.about }}</p>
      </div>
      <p class="about-title">About The Seller</p>
      <div class="about-seller">
        <div class="seller-profile">
          <div class="profile-img-about">
            <img :src="gigSellerImg" alt="seller image" class="seller-img" />
          </div>
        </div>
        <div class="rate-profile">
          <p>{{ gig.owner.fullname }}</p>
          <span class="stars-details"
            >{{ getStars }} 4
            <h1 class="review-length">({{ reviewLength }})</h1></span
          >
          <!-- <img src="getStars" alt=""> -->
          <button class="contact-me-btn">Contact Me</button>
        </div>
      </div>
      <div class="seller-info-details">
        <div class="info-table">
          <ul>
            <li>
              From
              <br />
              <b>{{ gig.loc }}</b>
            </li>
            <li>
              Avg. response time
              <br />
              <b>{{ gig.avgResponceTime }}</b>
            </li>
            <li>
              Member since
              <br />
              <b>{{ gig.avgResponceTime }}</b>
            </li>
            <li>
              Last delivery
              <br />
              <b>{{ gig.lastDelivery }}</b>
            </li>
          </ul>
        </div>
        <div class="seller-description">{{ gig.description }}</div>
      </div>
      <progress-bar-details :user="currUser" v-if="currUser" />
      <div v-if="currUser">
        <form
          class="review-form"
          v-if="loggedInUser"
          @submit.prevent="addReview()"
        >
          <p class="add-review-seller-p">Add your review about the seller</p>
          <textarea
            placeholder="Your Opinion Matters..."
            v-model="reviewToAdd.txt"
            class="text-area-details"
          ></textarea>
          <div class="rate-and-save">
            <div class="">
              <p class="rate-p">Rate:</p>
              <select
                name="Rate the owner"
                class="rate-owner-review"
                v-model="reviewToAdd.rate"
                placeholder="Rate"
              >
                <option value="" disabled selected>Select your Rate</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="save-review-btn">
              <button>Save</button>
            </div>
          </div>
        </form>
        <div class="reviews-wrap" v-for="review in gig.reviews" :key="review">
          <ul class="review-list">
            <li class="review-user">
              <div class="user-profile-image">
                <img :src="review.by.imgUrl" alt />
              </div>
              <div class="header-info">
                <div class="reviewer-details">
                  <p>{{ review.by.fullname }}</p>
                  <div class="review-rating">
                    <span class="star">★</span>
                    <p>{{ review.rate }}</p>
                  </div>
                </div>
                <div class="reviewer-sub-details">
                  <div class="country">
                    <img :src="review.by.flag" alt class="country-flag" />
                    <p>{{ review.by.country }}</p>
                  </div>
                </div>
              </div>
              <div class="review-description">
                <p>{{ review.txt }}</p>
              </div>
              <div class="review-published">
                <p>{{ review.reviewedAt }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="check-out-section">
      <div class="check-out-part">
        <div class="checkout-title">
          <p class="service">{{ gig.category }}</p>
          <p class="price">${{ gig.price }}</p>
        </div>
        <div class="additional-info">
          <div class="delivery-wrapper">
            <div class="img-clock">
              <img src="../assets/logo/clock.png" alt />
              <p>{{ gig.daysToMake }} &nbsp;Days Delivery</p>
            </div>
          </div>
          <div class="revision-wrapper">
            <img src="../assets/logo/cycle.png" alt />
            <p>{{ gig.daysToMake }} &nbsp;Revisions</p>
          </div>
        </div>
        <div class="promises-section">
          <div class="guarentee-section">
            <div class="v-image">
              <img
                src="../assets/logo/icons8-done-48.png"
                class="v-details"
                alt=""
              />
            </div>
            <p>High quality product guarenteed</p>
          </div>
          <div class="guarentee-section">
            <div class="v-image">
              <img
                src="../assets/logo/icons8-done-48.png"
                class="v-details"
                alt=""
              />
            </div>
            <p>Delivery on time guarentee</p>
          </div>
          <div class="guarentee-section">
            <div class="v-image">
              <img
                src="../assets/logo/icons8-done-48.png"
                class="v-details"
                alt=""
              />
            </div>
            <p>1 Product</p>
          </div>
        </div>
        <div class="buy-btn">
          <button @click="addOrder">Continue (${{ gigPrice }})</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { gigService } from "../services/gig.service.js";
import caruselDetails from "../components/carusel-details.vue";
import { orderService } from "../services/order.service.js";
import { userService } from "../services/user.service.js";
import progressBarDetails from "../components/progress-bar-details.vue";
import ProgressBarDetails from "../components/progress-bar-details.vue";
import caruserDetailsReview from "../components/caruser-details-review.vue";
import { reviewService } from "../services/review.service.js";
import { now } from "lodash";
// import { id } from "element-plus/lib/locale";
export default {
  name: "gig-detail",
  data() {
    return {
      gig: null,
      images: "",
      rates: "",
      orderToAdd: null,
      currUser: null,
      reviewToAdd: {
        txt: "",
        rate: "",
        createdAt: new Date().getMinutes(),
        flag:""
      },
    };
  },
  async created() {
    var { _id } = this.$route.params;
    await gigService.getById(_id).then((gig) => {
      this.gig = gig;
      this.images = gig.image;
      this.rates = gig.owner.rate;
      this.orderToAdd = orderService.getEmptyOrder();
      this.orderToAdd.gig._id = gig._id;
      this.orderToAdd.gig.name = gig.category;
      this.orderToAdd.gig.price = gig.price;
      this.orderToAdd.seller = gig.owner;
      const userId = this.gig.owner._id;
      userService.getById(userId).then((user) => {
        this.currUser = user;
      });
    });
    const userId = this.$store.getters.loggedinUser._id;
    const user = await userService.getById(userId);
    this.user = user;
    this.reviewToAdd = reviewService.getEmptyReview();
    var { _id, fullname, imgUrl, flag } = user;
    this.reviewToAdd.by = { _id, fullname, imgUrl, flag };
  },
  computed: {
    getMiniUser() {
      return this.$store.getters.getMiniUser;
    },
    gigSellerImg() {
      return this.gig.owner.imgUrl;
    },
    userImg() {
      return this.user.imgUrl;
    },
    gigImg() {
      return this.gig.image;
    },
    orders() {
      return this.$store.getters.orders;
    },
    getUser() {
      return this.user;
    },
    gigPrice() {
      return this.gig.price;
    },
    reviews() {
      return this.$store.getters.reviews;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
    getRateLength() {
      return this.user.reviews;
    },
    reviewLength() {
      return this.gig.reviews.length;
    },
    getStars() {
      let stars = "";
      for (let index = 0; index < this.gig.owner.rate; index++) {
        stars += "★";
      }
      return stars;
    },
  },
  methods: {
    async addOrder() {

      this.orderToAdd = orderService.getEmptyOrder();
      this.orderToAdd.buyer._id = this.loggedInUser._id;
      this.orderToAdd.buyer.name = this.loggedInUser.fullname;
      this.orderToAdd.seller._id = this.gig.owner._id;
      this.orderToAdd.seller.name = this.gig.owner.fullname;
      this.orderToAdd.gig._id = this.gig._id;
      this.orderToAdd.gig.name = this.gig.category;
      this.orderToAdd.gig.price = this.gig.price;
      this.orderToAdd.gig.title = this.gig.title
      this.$store.dispatch({ type: "addOrder", order: this.orderToAdd });
      this.$router.push("/user-profile");
    },
    async addReview() {
      const addedReview = await this.$store.dispatch({
        type: "addNewReview",
        review: this.reviewToAdd,
        aboutUserId: this.gig.owner._id,
      });
      this.gig.reviews.push(addedReview);
      this.reviewToAdd = reviewService.getEmptyReview();
    },
  },
  components: {
    caruselDetails,
    progressBarDetails,
    ProgressBarDetails,
    caruserDetailsReview,
    reviewService,
  },
};
</script>
<style scoped>
.demo-rate-block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
}
.demo-rate-block:last-child {
  border-right: none;
}
.demo-rate-block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
