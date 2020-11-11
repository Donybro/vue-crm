<template>
  <div class="app-main-layout">
    <div v-if="isReady">
      <Navbar @toggle-navbar="navbarIsOpen = !navbarIsOpen" />
      <SlideMenu v-model="navbarIsOpen" />
      <main class="app-content" :class="{ full: !navbarIsOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>
      <AddRecordButton />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import SlideMenu from "../components/SlideMenu";
import AddRecordButton from "../components/AddRecordButton";
import Loader from "../components/Loader";

export default {
  name: "mainLayout",
  data() {
    return {
      navbarIsOpen: true
    };
  },
  components: { Loader, AddRecordButton, SlideMenu, Navbar },
  mounted() {
    if (!Object.keys(this.$store.getters.getUserInfo).length) {
      this.$store.dispatch("fetchUserInfo");
    }
  },
  computed: {
    isReady() {
      return Object.keys(this.$store.getters.getUserInfo).length;
    }
  }
};
</script>

<style scoped></style>
