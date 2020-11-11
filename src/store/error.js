export default {
  state: {
    error: null
  },
  getters: {
    getCurrentError: s => s.error
  },
  mutations: {
    clearCurrentError: s => (s.error = null),
    setCurrentError: (s, payload) => (s.error = payload)
  },
  actions: {
    clearCurrentError: ({ commit }) => commit("clearCurrentError"),
    setCurrentError: ({ commit }) => commit("setCurrentError")
  }
};
