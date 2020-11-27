<template>
  <ul class="sidenav app-sidenav" :class="{ open: value }">
    <router-link
      tag="li"
      v-for="menu in menuList"
      :key="menu.name"
      :to="menu.to"
      active-class="active"
      :exact="menu.isExact"
    >
      <a class="waves-effect waves-orange pointer">{{ menu.name }}</a>
    </router-link>
  </ul>
</template>

<script>
import localize from "../filters/filter.localize";
export default {
  name: "SlideMenu",
  props: ["value"],
  data() {
    return {
      menuList: [
        {
          name: localize("Bill"),
          to: "/",
          isExact: true
        },
        {
          name: localize("History"),
          to: "/history",
          isExact: false
        },
        {
          name: localize("Planning"),
          to: "/planning",
          isExact: false
        },
        {
          name: localize("New record"),
          to: "/record",
          isExact: false
        },
        {
          name: localize("Categories"),
          to: "/categories",
          isExact: false
        }
      ]
    };
  },
  computed: {}
};
</script>

<style scoped></style>
