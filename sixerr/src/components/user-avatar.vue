<template>
  <div>
    <label class="user-avatar-container" for="imgUploader">
      <input
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile"
      />

      <img v-if="loggedinUser" :src="loggedinUser.imgUrl" alt="" />
      <img v-else src="../assets/img/portrait.png" alt="" />
    </label>
    <!-- <el-avatar :src="loggedInUser.img" class="user-avatar-info">
      {{ defaultProfilePicture }}
    </el-avatar> -->
  </div>

</template>

<script>
import { userService } from "../services/user.service.js";
export default {
  props: {
    loggedinUser: {
      // type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    async handleFile(event) {
      try {
        const userImgUrl = await userService.uploadImg(event);
        this.$emit('imgUploaded', userImgUrl)
      } catch {
        console.log("error");
      }
    },
  },
  computed: {
    defaultProfilePicture() {
      const username = this.$store.getters.loggedinUser.username;
      return username.charAt(0).toUpperCase();
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
  },
};
</script>
