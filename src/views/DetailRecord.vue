<template>
  <div>
    <div>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{"History"|localize}}</router-link>
        <a @click.prevent class="breadcrumb">{{ record.type === "outcome" ? "Расход" : "Доход" }}</a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income'
            }"
          >
            <div class="card-content white-text">
              <p>{{ "Description" |localize}} : {{ record.description }}</p>
              <p>{{"Sum"|localize}} : {{ record.amount | currency }}</p>
              <p>{{"Category"|localize}} : {{ record.categoryName }}</p>
              <small>{{ Date.parse(record.date) | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailRecord",
  metaInfo: {
    titleTemplate: "%s | Detail records"
  },
  data() {
    return {
      loading: true,
      record: null
    };
  },
  async mounted() {
    const recordId = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", recordId);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    if (!record || !category) {
      this.loading = false;
      return null;
    } else {
      this.loading = false;
      this.record = {
        ...record,
        categoryName: category.name
      };
      console.log(this.record);
    }
  }
};
</script>

<style scoped></style>
