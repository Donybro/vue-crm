<template>
  <div>
    <div class="page-title">
      <h3>{{"Record`s history" | localize}}</h3>
    </div>
    <history-chart :records="records" v-if="records" />
    <section>
      <Loader v-if="loading" />
      <div v-else-if="!loading && records">
        <HistoryTable :records="records" />
      </div>
      <p class="center" v-else>Добавленных запией нет{{"Records is empty" | localize}}</p>
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";
import Loader from "../components/Loader";
import historyChart from "../components/historyChart";

export default {
  name: "History",
  components: { Loader, HistoryTable, historyChart },
  data() {
    return {
      loading: true,
      records: null
    };
  },
  async mounted() {
    const categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");
    if (!categories || !records) {
      this.loading = false;
    } else {
      this.records = records.map(record => {
        const categoryName = categories.find(
          category => category.id === record.categoryId
        ).name;
        const typeClass = record.type === "outcome" ? "red" : "green";
        const typeText = record.type === "outcome" ? "Outcome" : "Income";
        return {
          ...record,
          categoryName,
          typeClass,
          typeText
        };
      });

      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
