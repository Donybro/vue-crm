<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>
      <button
        class="btn waves-effect waves-light btn-small"
        @click="fetchCurrencyInfo"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <div v-if="!isLoading" class="row">
      <Bill :rates="currencyInfo.rates" />
      <Currency :currencyInfo="currencyInfo" />
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import messages from "../plugins/messages";
import Bill from "../components/Bill";
import Currency from "../components/Currency";
import Loader from "../components/Loader";

export default {
  name: "Home",
  components: { Loader, Currency, Bill },
  data() {
    return {
      currencyInfo: null,
      isLoading: true
    };
  },
  methods: {
    async fetchCurrencyInfo() {
      this.isLoading = true;
      const { base, date, rates } = await this.$store.dispatch("fetchCurrency");
      this.currencyInfo = { base, date, rates };
      this.isLoading = false;
    }
  },
  async mounted() {
    await this.fetchCurrencyInfo();
    messages[this.$route.query.message]
      ? setTimeout(() => {
          this.$customMessageToast(messages[this.$route.query.message]);
        }, 500)
      : null;
  }
};
</script>

<style scoped></style>
