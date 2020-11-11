<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section v-if="!isLoading">
      <div class="row">
        <CategoryCreate @category-created="refresh" />
        <CategoryEdit
          v-if="categories.length"
          @category-updated="refresh"
          :categories="categories"
        />
        <p v-else class="center">Категорий еще нет</p>
      </div>
    </section>
    <Loader v-else />
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
      key: 1111111,
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

<style scoped></style>
