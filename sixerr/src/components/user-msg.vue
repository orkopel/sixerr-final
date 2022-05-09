<template>
  <section class="user-msg" :class="msgType">{{ userMsg.txt }}</section>
</template>

<script>
export default {
  props: ["userMsg"],
  computed:{
       msgType() {
      return `status-${this.userMsg.type === 'pending'? 'pending' : 'approved'}`
    }
  }
}
</script>
<style>
.user-msg {
  position: fixed;
  bottom: 140px;
  left: 40px;
  border: 2px solid black;
  padding: 15px;
  border-radius: 3px;
  font-family: "macan-bold";
  font-weight: bold;
}
.status-pending {
  color: #dda464;
  border-color: #dda464;
}

.status-approved {
  color: #1dbf73;
  border-color: #1dbf73;
}
</style>
