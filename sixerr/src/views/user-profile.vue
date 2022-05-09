<template>
  <section class="main-layout">
    <div class="user-profile-main-content" v-if="username">
      <div class="user-profile-info-card">
        <div class="user-profile-img-card">
          <user-avatar :loggedinUser="loggedinUser" @imgUploaded="imgUploaded" />
          
          <!-- <img-upload @save="saveImg" /> -->
          <!-- <img-list :imgUrls="imgUrls" @setAvatar="setAvatar" /> -->
          <!-- img-list render the imgs -->

          <!-- user-avatar show the clicked img as profile -->
        </div>
        <div class="edit-profile">
          <div class="username-name">{{ username }}</div>
          <!-- <img src="../img/240_F_92207930_yYUGJ54mCXRFs5RyydyrmdayYOQ58ZWx.jpg" alt="edit icon" /> -->
        </div>

        <div class="user-from-member">
          <div class="user-from">
            <div>
              <img
                class="from-img"
                src="../assets/img/location.png"
                alt=""
              />
              <span>From</span>
            </div>
            <div class="from-font">Israel</div>
          </div>
          <div class="user-member">
            <div>
              <img
                class="user-img-info"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                alt=""
              />
              <span>Member since</span>
            </div>
            <div class="from-font">Apr 2022</div>
          </div>
        </div>
      </div>
      <div class="user-orders">
        <user-orders
          :orders="orders"
          :loggedUserId="loggedinUser._id"
          @onApprove="approveOrder"
        />
      </div>
    </div>
  </section>
</template>

<script>
import userAvatar from "../components/user-avatar.vue";
import userOrders from "../components/user-orders.vue";
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    async imgUploaded(imgUrl) {
      const user = { ...this.loggedinUser, imgUrl };
      await this.$store.dispatch({ type: "save", user });
    },
    approveOrder(orderId) {
      this.$store.dispatch({ type: "approveOrder", orderId });
    },
  },
  created() {
    this.$store.dispatch({ type: "loadMyOrders" });
  },
  computed: {
    username() {
      if (this.$store.getters.loggedinUser) {
        const userName = this.$store.getters.loggedinUser.username;
        const cpitalUserName =
          userName.charAt(0).toUpperCase() + userName.slice(1);
        return cpitalUserName;
      }
    },
    orders() {
      return this.$store.getters.getOrders;
    },
    loggedinUser(){
      return this.$store.getters.loggedinUser
    }
  },
  components: {
    userAvatar,
    userOrders,
  },
};
</script>

<style></style>
