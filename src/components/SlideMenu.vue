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
export default {
  name: "SlideMenu",
  props: ["value"],
  data() {
    return {
      menuList: [
        {
          name: "Счет",
          to: "/",
          isExact: true
        },
        {
          name: "История",
          to: "/history",
          isExact: false
        },
        {
          name: "Планирование",
          to: "/planning",
          isExact: false
        },
        {
          name: "Новая запись",
          to: "/record",
          isExact: false
        },
        {
          name: "Категории",
          to: "/categories",
          isExact: false
        }
      ]
    };
  }
};
</script>

<style scoped></style>
