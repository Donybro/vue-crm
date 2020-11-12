<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="isLoading" />
    <form
      v-else-if="!isLoading && categories"
      class="form"
      @submit.prevent="setRecord"
    >
      <div class="input-field">
        <select ref="select" v-model="categoryId">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid:
              ($v.amount.$dirty && !$v.amount.required) ||
              ($v.amount.$dirty && !$v.amount.minValue)
          }"
        />
        <label for="amount">Сумма</label>
        <span v-if="!$v.amount.minValue" class="helper-text invalid"
          >Сумма должна быть не менее 100</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid:
              ($v.description.$dirty && !$v.description.required) ||
              ($v.description.$dirty && !$v.description.minLength)
          }"
        />
        <label for="description">Описание</label>
        <span v-if="!$v.description.minLength" class="helper-text invalid"
          >Описание должно быть не менее 5 символов</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
    <p v-else class="center">
      Категорий нет.
      <router-link to="/categories">Добавить</router-link>
    </p>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import { required, minValue, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "Record",
  components: { Loader },
  data() {
    return {
      select: null,
      isLoading: true,
      categoryId: null,
      type: "income",
      description: "",
      amount: null,
      categories: null
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  validations: {
    amount: { required, minValue: minValue(100) },
    description: { required, minLength: minLength(5) }
  },
  async mounted() {
    window.M.updateTextFields();
    this.categories = await this.$store.dispatch("fetchCategories");
    if (!this.categories) {
      this.isLoading = false;
    } else {
      this.categoryId = this.categories[0].id;
      setTimeout(() => {
        this.select = window.M.FormSelect.init(this.$refs.select);
      });
      this.isLoading = false;
    }
  },
  methods: {
    setRecord() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      if (this.type === "outcome" && this.getUserInfo.bill < this.amount) {
        this.$customMessageToast(
          `Не хватает средств на счету : ${this.amount -
            this.getUserInfo.bill} `
        );
      } else {
        this.$store.dispatch("createRecord", {
          categoryId: this.categoryId,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON()
        });
        this.description = "";
        this.amount = null;
        this.$v.$reset();
        this.$customMessageToast("Запись успешно добавлена !");
      }
    }
  }
};
</script>

<style scoped></style>
