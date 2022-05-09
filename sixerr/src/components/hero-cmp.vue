<template>
  <div class="hero-section">
    <div class="hero-img">
      <div
        :style="{ backgroundImage: `url(${image})` }"
        class="hero-img-box"
      ></div>
    </div>
    <div class="hero-box">
      <div class="hero-container main-layout flex space-between">
        <div class="hero-content">
          <h1>
            Find the perfect
            <span>freelance</span>
            <br />services for your business
          </h1>

          <gig-filter @setFilter="setFilter" />
          <div class="popular-categories">
            <p>Popular:</p>
            <span>
              <a>Website Design</a>
            </span>
            <span>
              <a>Wordpress</a>
            </span>
            <span>
              <a>Logo Design</a>
            </span>
            <span>
              <a>Music</a>
            </span>
          </div>
        </div>
        <div class="seller-star-name-box">
          <div class="seller-star-name">
            <p class="stars-hero">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1792 1792"
                width="15"
                height="15"
              >
                <path
                  fill="currentColor"
                  d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1792 1792"
                width="15"
                height="15"
              >
                <path
                  fill="currentColor"
                  d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1792 1792"
                width="15"
                height="15"
              >
                <path
                  fill="currentColor"
                  d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1792 1792"
                width="15"
                height="15"
              >
                <path
                  fill="currentColor"
                  d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1792 1792"
                width="15"
                height="15"
              >
                <path
                  fill="currentColor"
                  d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                />
              </svg>
            </p>
            <p class="seller-name-hero">{{ sellerName }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gigFilter from "./gig-filter.vue";
export default {
  data() {
    return {
      images: [
        "http://res.cloudinary.com/sixerr/image/upload/v1649148892/hero16_nskjyp.jpg",
        "http://res.cloudinary.com/sixerr/image/upload/v1649148986/hero14_mebdgx.jpg",
        "http://res.cloudinary.com/sixerr/image/upload/v1649149009/man1_vi6i3w.jpg",
        "http://res.cloudinary.com/sixerr/image/upload/v1649148970/hero13_tptxhl.jpg",
        "http://res.cloudinary.com/sixerr/image/upload/v1649148933/hero11_edabwd.jpg",

      ],
      image: "src/assets/img/hero16.jpg",
      sellerNames: [
        "Andrea, Fashion Designer",
        "Suzan, Bar Owner",
        "James, Marketing Expert",
        "Suzanne, Full Stack Developer",
        "Christian, Podcast Editor",
        "Pamela, Project Manager",
      ],
      sellerName: "Pamela, Project Manager",
    };
  },

  methods: {
    setImage() {
      var i = 0;
      const that = this;
      setInterval(function () {
        that.image = that.images[i];
        i = i + 1;
        if (i === that.images.length) {
          i = 0;
        }
      }, 5000);
    },
    setSellerName() {
      var i = 0;
      const that = this;
      setInterval(function () {
        that.sellerName = that.sellerNames[i];
        i = i + 1;
        if (i === that.sellerNames.length) {
          i = 0;
        }
      }, 5000);
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: "setFilter", filterBy });
      this.$router.push("/explore");
    },
  },

  computed: {},
  created() {
    this.setImage();
    this.setSellerName();
  },
  components: {
    gigFilter,
  },
};
</script>
