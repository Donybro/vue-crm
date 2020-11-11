import firebase from "firebase/app";

export default {
  state: {
    categories: null,
    lastSelected: null
  },
  getters: {
    getCategories: s => s.categories,
    getLastSelectedCategory: s => s.lastSelected
  },
  mutations: {
    setCategory: (s, payload) => (s.categories = payload),
    setLastSelectedCategory: (s, payload) => (s.lastSelected = payload)
  },
  actions: {
    async createCategories({ dispatch }, payload) {
      const uid = await dispatch("getUId");
      await firebase
        .database()
        .ref(`/users/${uid}/category`)
        .push(payload);
    },
    setLastSelectedCategory({ commit }, payload) {
      commit("setLastSelectedCategory", payload);
    },
    async fetchCategories({ dispatch }) {
      const uid = await dispatch("getUId");
      let categories = (
        await firebase
          .database()
          .ref(`/users/${uid}/category`)
          .once("value")
      ).val();
      return Object.keys(categories).map(key => ({
        ...categories[key],
        id: key
      }));
    },
    async updateCategory({ dispatch }, { id, name, limit }) {
      const uid = await dispatch("getUId");
      await firebase
        .database()
        .ref(`users/${uid}/category`)
        .child(id)
        .update({
          name,
          limit
        });
    }
  }
};
