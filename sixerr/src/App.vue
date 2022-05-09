<template>
  <section>
    <app-header :class="$route.meta.headerClass" />
    <div class="main-content-container">
      <router-view />
    </div>
    <app-footer />
    <user-msg :userMsg="userMsg" v-if="userMsg"></user-msg>
  </section>
</template>

<script>
import appHeader from "./components/app-header.vue";
import appFooter from "./components/app-footer.vue";
import { userService } from "./services/user.service.js";
import userMsg from "./components/user-msg.vue"
export default {
  name: "App",
  data() {
    return {
      isScreen: false,
    };
  },
  created() {
    this.$store.dispatch({ type: "loadGigs" });
    this.$store.dispatch({ type: "fetchLoggedinUser"});
  },
  components: {
    appHeader,
    appFooter,
    userMsg
  },
  computed: {
    userMsg() {
      return this.$store.getters.userMsg
    }
  },
  methods: {},
  mounted() {},
};
</script>


