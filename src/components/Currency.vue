<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{"Currency in UZS"|localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{"Currency"|localize}}</th>
              <th>{{"Current"|localize}}</th>
              <th>{{"Date"|localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency in currencies" :key="currency.value">
              <td>{{ currency.name }}</td>
              <td>{{ currency.value }}</td>
              <td>{{ currencyInfo.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Currency",
  props: ["currencyInfo"],
  computed: {
    currencies() {
      return Object.keys(this.currencyInfo.rates).map(rateName => ({
        name: `${rateName}`,
        value: Math.round(
          (this.currencyInfo.rates["EUR"] / this.currencyInfo.rates[rateName]) *
            this.currencyInfo.rates["UZS"]
        )
      }));
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
