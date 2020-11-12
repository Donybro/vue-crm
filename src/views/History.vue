<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <section>
      <Loader v-if="loading" />
      <HistoryTable v-else-if="!loading && records" :records="records" />
      <p class="center" v-else>Добавленных запией нет</p>
    </section>
  </div>
</template>

<script>
import HistoryTable from "../components/HistoryTable";
import Loader from "../components/Loader";

export default {
  name: "History",
  components: { Loader, HistoryTable },
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
        const typeText = record.type === "outcome" ? "Расход" : "Доход";
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
