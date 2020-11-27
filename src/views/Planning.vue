<template>
  <div>
    <div class="page-title">
      <h3>{{"Planning"|localize}}</h3>
      <h4>{{ getUserInfo.bill | currency("UZB") }}</h4>
    </div>
    <Loader v-if="isLoading" />
    <section v-else-if="!isLoading && categories">
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.name }}:</strong>
          {{ category.spend | currency }} {{"from"|localize}} {{ category.limit | currency }}
        </p>
        <div class="progress" v-tooltip="category.tooltipText">
          <div
            class="determinate"
            :class="[category.spendColor]"
            :style="{ width: category.spendPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
    <p v-else class="center">
      {{"Planned records is empty"|localize}}
      <br />
      <router-link to="/categories">{{"Add category"|localize}}</router-link>
      <br />
      <router-link to="/record">{{"Add record"|localize}}</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Loader from "../components/Loader";
import filterCurrency from "../filters/filter.currency";
import localize from "../filters/filter.localize";
export default {
  name: "Planning",
  components: { Loader },
  data() {
    return {
      categories: null,
      isLoading: true
    };
  },
  async mounted() {
    const categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");
    if (!categories || !records) {
      this.isLoading = false;
    } else {
      this.categories = categories.map(category => {
        const spend = records
          .filter(record => record.categoryId === category.id)
          .filter(record => record.type === "outcome")
          .reduce((total, record) => {
            return (total += +record.amount);
          }, 0);
        const spendPercent =
          (spend / category.limit) * 100 < 100
            ? (spend / category.limit) * 100
            : 100;
        let spendColor;
        if (spendPercent < 60) {
          spendColor = "green";
        } else {
          if (spendPercent < 100) {
            spendColor = "yellow";
          } else spendColor = "red";
        }
        const tooltipValue = category.limit - spend;
        let tooltipText;
        if (tooltipValue > 0) {
          tooltipText =
            localize("Balance :") + `${filterCurrency(Math.abs(tooltipValue))}`;
        } else {
          tooltipText =
            localize("Limit is exceeded") +
            `${filterCurrency(Math.abs(tooltipValue))}`;
        }
        return {
          ...category,
          spend,
          spendPercent,
          spendColor,
          tooltipText
        };
      });
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  }
};
</script>

<style scoped></style>
