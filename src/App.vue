<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>
<script>
import emptyLayout from "./layouts/emptyLayout";
import mainLayout from "./layouts/mainLayout";

export default {
  metaInfo: {
    title: "App"
  },
  components: {
    emptyLayout,
    mainLayout
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout}-layout` || "empty-layout";
    }
  }
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "./assets/index.css";
</style>
