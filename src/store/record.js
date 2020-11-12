import firebase from "firebase/app";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createRecord({ dispatch, getters }, recordData) {
      try {
        const uid = await dispatch("getUId");
        await firebase
          .database()
          .ref(`users/${uid}/record`)
          .push(recordData);
        let bill;
        recordData.type === "outcome"
          ? (bill = getters.getUserInfo.bill - recordData.amount)
          : (bill = getters.getUserInfo.bill + recordData.amount);
        await dispatch("updateUserInfo", { bill });
      } catch (e) {
        dispatch("setCurrentError", e.code);
        throw e;
      }
    },
    async fetchRecords({ dispatch }) {
      try {
        const uid = await dispatch("getUId");
        const records = (
          await firebase
            .database()
            .ref(`/users/${uid}/record`)
            .once("value")
        ).val();
        return Object.keys(records).map(key => ({
          id: key,
          ...records[key]
        }));
      } catch (e) {
        dispatch("setCurrentError", e.code);
        return null;
      }
    },
    async fetchRecordById({ dispatch }, id) {
      try {
        const uid = await dispatch("getUId");
        const record = (
          await firebase
            .database()
            .ref(`/users/${uid}/record`)
            .child(id)
            .once("value")
        ).val();
        return {
          ...record,
          id
        };
      } catch (e) {
        dispatch("setCurrentError", e.code);
        return null;
      }
    }
  }
};
