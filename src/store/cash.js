export default {
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      let cashInfo = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=EUR,USD,UZS`
      );
      return cashInfo.json();
    }
  }
};
