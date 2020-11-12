import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main-page",
    component: () => import("../views/Home"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { layout: "empty", auth: false }
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/Registration"),
    meta: { layout: "empty", auth: false }
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/Categories"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    component: () => import("../views/DetailRecord"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/planning",
    name: "planning",
    component: () => import("../views/Planning"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/history",
    name: "history",
    component: () => import("../views/History"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile"),
    meta: { layout: "main", auth: true }
  },
  {
    path: "/record",
    name: "record",
    component: () => import("../views/Record"),
    meta: { layout: "main", auth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  const requireAuth = to.matched.some(record => record.meta.auth);
  if (requireAuth && !user) {
    next("/login?error=no-auth");
  } else {
    next();
  }
});
export default router;
