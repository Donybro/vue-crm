import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import AsyncComputed from "vue-async-computed";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "./filters/filter.date";
import filterCurrency from "./filters/filter.currency";
import messageToastPlugin from "./plugins/custom.message.toast";
import firebase from "firebase/app";

Vue.filter("date", dateFilter);
Vue.filter("currency", filterCurrency);
Vue.use(AsyncComputed);
Vue.use(Vuelidate);
Vue.use(messageToastPlugin);
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyCiHJR89U5d1UCgk1IFli4frvHi1qMMMhM",
  authDomain: "vue-crm-df5dc.firebaseapp.com",
  databaseURL: "https://vue-crm-df5dc.firebaseio.com",
  projectId: "vue-crm-df5dc",
  storageBucket: "vue-crm-df5dc.appspot.com",
  messagingSenderId: "1076492002733",
  appId: "1:1076492002733:web:b8fe77582a84f77591ed24",
  measurementId: "G-H5LGB6LMSE"
});

Vue.config.productionTip = false;

// for correct firebase-auth working
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
