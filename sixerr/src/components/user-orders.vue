<template>
  <section>
    <table class="table-back-office">
      <tr class="table-tr">
        <th>Created</th>
        <th class="gig-title-th">Gig Title</th>
        <th class="gig-name-table">Gig Name</th>
        <th>Price</th>
        <th class="Status-tr">Status</th>
        <!-- <th>Seller Name</th> -->
        <th class="action-tr" v-if="isSeller">Action</th>
      </tr>
      <tr class="order-table" v-for="order in orders" :key="order">
        <td>
          {{
            new Date(order.createdAt).toLocaleString([], {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              // hour: "2-digit",
              // minute: "2-digit",
              hour12: false,
            })
          }}
        </td>
        <td class="gig-title-table">{{ order.gig.title }}</td>
        <td>{{ order.gig.name }}</td>
        <td>${{ order.gig.price }}</td>
        <td class="order-status" :class="isApproved(order.status)" >{{ order.status }}</td>
        <!-- <td>{{ order.seller.name }}</td> -->
        <td v-if="isUserSeller(order.seller._id)">
          <!-- <span v-if="isUserSeller(order.seller._id)">Approve!</span> -->
          <img class="done" src="../assets/img/done.png" alt="done icon" @click="onApprove(order._id)"/>
          <img class="cross" src="../assets/img/cross-mark.png" alt="cross mark icon"/>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
import { orderService } from "../services/order.service";
import { gigService } from "../services/gig.service";
export default {
  name: "user-orders",
  created() {},
  props: {
    orders: {
      type: Array,
    },
    loggedUserId: {
      type: String,
    },
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  computed: {
    isSeller(){
     return this.orders.some(order => order.seller._id === this.loggedUserId)
    },
  },
  methods: {
    onApprove(orderId) {
      this.$emit("onApprove", orderId);
    },
    isUserSeller(sellerId) {
      return sellerId === this.loggedUserId;
    },
    isApproved(orderStatus) {
      return `status-${orderStatus === 'pending'? 'pending-table' : 'approved-table'}`
    }
  },
};
</script>
