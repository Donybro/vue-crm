import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import error from "./error";
import user from "./user";
import cash from "./cash";
import category from "./category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    user,
    cash,
    category
  }
});
