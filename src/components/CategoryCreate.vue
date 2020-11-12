<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="createCategory">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{
              invalid:
                (this.$v.name.$dirty && !this.$v.name.required) ||
                (this.$v.name.$dirty && !this.$v.name.minLength)
            }"
          />
          <label for="name">Название</label>
          <span v-if="!this.$v.name.minLength" class="helper-text invalid">
            Название категории слишком короткое
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model="limit"
            :class="{
              invalid:
                (this.$v.limit.$dirty && !this.$v.limit.required) ||
                (this.$v.limit.$dirty && !this.$v.limit.minValue)
            }"
          />
          <label for="limit">Лимит</label>
          <span v-if="!this.$v.limit.minValue" class="helper-text invalid">
            Минимальная величина должна быть больше
            {{ this.$v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue, minLength } from "vuelidate/lib/validators";

export default {
  name: "CategoryCreate",
  data() {
    return {
      limit: null,
      name: ""
    };
  },
  validations: {
    limit: { required, minValue: minValue(100) },
    name: { required, minLength: minLength(2) }
  },
  computed: {
    limitVal() {
      return this.limit < 1;
    }
  },
  methods: {
    async createCategory() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      await this.$store.dispatch("createCategories", {
        name: this.name,
        limit: this.limit
      });
      this.limit = null;
      this.name = "";
      this.$emit("category-created");
      this.$customMessageToast("Категория успешно добавлена");
    }
  }
};
</script>

<style scoped></style>
