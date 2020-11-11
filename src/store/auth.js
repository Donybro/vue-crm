import firebase from "firebase/app";

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return true;
      } catch (e) {
        commit("setCurrentError", e.code);
        return false;
      }
    },
    async logout({ dispatch }) {
      await firebase.auth().signOut();
      dispatch("clearUserInfo");
    },
    getUId() {
      const user = firebase.auth().currentUser;
      return user.uid ? user.uid : null;
    },
    async registration({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch("getUId");
        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .set({
            bill: 1000,
            name
          });
        return true;
      } catch (e) {
        commit("setCurrentError", e.code);
        return false;
      }
    }
  }
};
