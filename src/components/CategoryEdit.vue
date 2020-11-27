<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Edit"|localize}}</h4>
      </div>

      <form @submit.prevent="updateCategory">
        <div class="input-field">
          <select ref="select" v-model="selectedCategoryId">
            <option
              v-for="category of categories"
              :value="category.id"
              :key="category.id"
            >{{ category.name }}</option>
          </select>
          <label>{{"Chose category"|localize}}</label>
        </div>

        <div class="input-field">
          <input type="text" id="name" v-model="selectedCategoryName" />
          <label for="name">{{"Name of"|localize}}</label>
        </div>

        <div class="input-field">
          <input id="limit" type="number" v-model="selectedCategoryLimit" />
          <label for="limit">{{"Limit"|localize}}</label>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          {{"Update"|localize}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  props: ["categories"],
  data() {
    return {
      select: null,
      selectedCategoryId: null,
      selectedCategoryName: "",
      selectedCategoryLimit: null
    };
  },
  watch: {
    selectedCategoryId(id) {
      const cat = this.categories.find(cat => cat.id === id);
      this.selectedCategoryName = cat.name;
      this.selectedCategoryLimit = cat.limit;
    }
  },
  methods: {
    updateCategory() {
      if (this.selectedCategoryName && this.selectedCategoryLimit) {
        this.$store.dispatch("updateCategory", {
          id: this.selectedCategoryId,
          name: this.selectedCategoryName,
          limit: this.selectedCategoryLimit
        });
        this.$emit("category-updated");
        this.$customMessageToast("category edited successfully");
      }
    }
  },
  async mounted() {
    window.M.updateTextFields();
    this.select = window.M.FormSelect.init(this.$refs.select);
    this.isLoading = false;
  },
  created() {
    let index = this.categories.length - 1;
    this.selectedCategoryLimit = this.categories[index].limit;
    this.selectedCategoryName = this.categories[index].name;
    this.selectedCategoryId = this.categories[index].id;
  },
  beforeDestroy() {
    this.select && this.select.destroy ? this.select.destroy() : null;
  }
};
</script>

<style scoped></style>
