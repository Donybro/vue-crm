<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @category-created="refresh" />
        <Loader v-if="isLoading" class="center col s6" />
        <CategoryEdit
          v-else-if="!isLoading && categories"
          @category-updated="refresh"
          :categories="categories"
        />
        <p v-else class="center col s6">
          Категорий еще нет
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryEdit from "../components/CategoryEdit";
import CategoryCreate from "../components/CategoryCreate";
import Loader from "../components/Loader";

export default {
  name: "Categories",
  data() {
    return {
      categories: null,
      isLoading: true
    };
  },
  components: { Loader, CategoryCreate, CategoryEdit },
  methods: {
    async refresh() {
      this.isLoading = true;
      this.categories = await this.$store.dispatch("fetchCategories");
      this.isLoading = false;
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.isLoading = false;
  }
};
</script>

<style scoped>
.a {
  border: 1px solid #000;
}
</style>
