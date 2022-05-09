<template>
  <section class="login section">

    <div class="login-container">
      <!-- <button @click="$emit('closeLogin')">X</button> -->
      <h3>Sign In to Sixerr</h3>
      <form @submit.prevent="doLogin" class="login-details">
        <input
          type="text"
          v-model="loginCred.username"
          placeholder="Enter username"
        />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Enter password"
        />
        <button>Continue</button>
      </form>
      <div class="login-footer flex justify-center align-center">
        <p>Not a member yet?</p>
        <a @click="Join">Join Now</a>
      </div>
    </div>
  </section>
</template>
<script>
import { userService } from "../services/user.service.js";
export default {
  data() {
    return {
      loginCred: { username: "", password: "" },
    };
  },
  methods: {
    async doLogin() {
      this.$emit("toggleLogin");
      try {
        this.$store.dispatch({ type: "login", cred: this.loginCred });
      } catch (err) {
        console.log("error", err);
      }
    },
    Join() {
      this.$emit("join");
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  computed: {},
};
</script>
