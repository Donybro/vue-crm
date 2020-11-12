import firebase from "firebase/app";

export default {
  actions: {
    async createCategories({ dispatch }, payload) {
      const uid = await dispatch("getUId");
      await firebase
        .database()
        .ref(`/users/${uid}/category`)
        .push(payload);
    },
    async fetchCategories({ dispatch }) {
      try {
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
      } catch (e) {
        dispatch("setCurrentError", e.code);
        return null;
      }
    },
    async fetchCategoryById({ dispatch }, id) {
      try {
        const uid = await dispatch("getUId");
        let category = (
          await firebase
            .database()
            .ref(`/users/${uid}/category`)
            .child(id)
            .once("value")
        ).val();
        return { ...category, id };
      } catch (e) {
        dispatch("setCurrentError", e.code);
        return null;
      }
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
