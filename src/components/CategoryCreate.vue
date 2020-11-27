<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{"Create"|localize}}</h4>
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
          <label for="name">{{"Name of" | localize}}</label>
          <span
            v-if="!this.$v.name.minLength"
            class="helper-text invalid"
          >{{"Name of category is too short"|localize}}</span>
        </div>

        <div class="input-field">
          <money
            id="limit"
            v-bind="money"
            v-model="limit"
            :class="{
              invalid:
                (this.$v.limit.$dirty && !this.$v.limit.required) ||
                (this.$v.limit.$dirty && !this.$v.limit.minValue)
            }"
          >limit</money>
          <label for="limit">{{"Limit" | localize}}</label>
          <span v-if="!this.$v.limit.minValue" class="helper-text invalid">
            {{"Minimal value must be bigger than"|localize}}
            {{ this.$v.limit.$params.minValue.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{"Create"|localize}}
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
      name: "",
      money: {
        decimal: ".",
        thousands: ",",
        prefix: " ",
        suffix: "  UZS",
        precision: 0,
        masked: false
      }
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
      this.$customMessageToast("category added successfully");
    }
  }
};
</script>

<style scoped></style>
