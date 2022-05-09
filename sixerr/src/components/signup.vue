<template>
  <div class="sign-up-container">
    <!-- <button @click="$emit('closeSignup')">X</button> -->
    <h3>Join Sixerr</h3>
    <form @submit.prevent="doSignup" class="signup-details">
      <input
        type="text"
        v-model="signupCred.fullname"
        placeholder="Enter fullname"
      />
      <input
        type="text"
        v-model="signupCred.username"
        placeholder="Enter username"
      />
      <input
        type="text"
        v-model="signupCred.password"
        placeholder="Enter password"
      />
      <button>Continue</button>
      <h4>By joining I agree to receive emails from Sixerr.</h4>
    </form>
  </div>
</template>
<script>
import { userService } from "../services/user.service.js";
export default {
  data() {
    return {
      signupCred: { username: "", password: "", fullname: "" },
      // loggedinUser: userService.getLoggedinUser(),
    };
  },
  methods: {
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        return;
      }
      this.$emit('toggleSignup')  
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      // TODO close modal && show user is login
         
      //   this.$router.push("/app");
    },
  },
};
</script>
