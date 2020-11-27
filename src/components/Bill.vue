<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{"Bill in currency" | localize}}</span>

        <p class="currency-line" v-for="currency in currencies" :key="currency">
          <span>
            {{
            getCurrency(currency).toFixed(2) | currency(currency)
            }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bill",
  props: ["rates"],
  methods: {
    getCurrency(currency) {
      return this.bill * this.rates[currency];
    }
  },
  computed: {
    bill() {
      return (
        this.$store.getters.getUserInfo.bill /
        this.rates["UZS"] /
        this.rates["EUR"]
      );
    }
  },
  data() {
    return {
      currencies: ["EUR", "USD", "UZS"]
    };
  }
};
</script>

<style scoped></style>
