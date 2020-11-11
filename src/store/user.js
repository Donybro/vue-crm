import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  getters: {
    getUserInfo(state) {
      return state.info;
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.info = payload;
    },
    clearUserInfo(state) {
      state.info = {};
    }
  },
  actions: {
    setUserInfo({ commit }, payload) {
      return commit("setUserInfo", payload);
    },
    async fetchUserInfo({ dispatch, commit }) {
      const uid = await dispatch("getUId");
      const info = (
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once("value")
      ).val();
      commit("setUserInfo", info);
    },
    clearUserInfo({ commit }) {
      return commit("clearUserInfo");
    }
  }
};
