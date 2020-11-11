import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main-page",
    component: () => import("../views/Home"),
    meta: { layout: "main" }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { layout: "empty" }
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/Registration"),
    meta: { layout: "empty" }
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/Categories"),
    meta: { layout: "main" }
  },
  {
    path: "/detail-record",
    name: "detail-record",
    component: () => import("../views/DetailRecord"),
    meta: { layout: "main" }
  },
  {
    path: "/planning",
    name: "planning",
    component: () => import("../views/Planning"),
    meta: { layout: "main" }
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/History"),
    meta: { layout: "main" }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home"),
    meta: { layout: "main" }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile"),
    meta: { layout: "main" }
  },
  {
    path: "/record",
    name: "record",
    component: () => import("../views/Record"),
    meta: { layout: "main" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
