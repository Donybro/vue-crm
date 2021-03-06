<template>
  <div>
    <div class="page-title">
      <h3>{{"New record" | localize}}</h3>
    </div>
    <Loader v-if="isLoading" />
    <form v-else-if="!isLoading && categories" class="form" @submit.prevent="setRecord">
      <div class="input-field">
        <select ref="select" v-model="categoryId">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{ category.name }}</option>
        </select>
        <label>{{"Chose category" | localize}}</label>
      </div>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="income" v-model="type" />
          <span>{{"Income"|localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap" name="type" type="radio" value="outcome" v-model="type" />
          <span>{{"Outcome"|localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <money
          id="amount"
          v-model.number="amount"
          v-bind="money"
          :class="{
            invalid:
              ($v.amount.$dirty && !$v.amount.required) ||
              ($v.amount.$dirty && !$v.amount.minValue)
          }"
        >{{amount}}</money>
        <label for="amount">{{"Sum"|localize}}</label>
        <span
          v-if="!$v.amount.minValue"
          class="helper-text invalid"
        >{{"Sum must be grater than 100"}}</span>
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
        <label for="description">{{"Description"|localize}}</label>
        <span
          v-if="!$v.description.minLength"
          class="helper-text invalid"
        >{{"Description must be bigger than 5 symbols"}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Create" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
    <p v-else class="center">
      {{"No any categories" | localize}}
      <router-link to="/categories">{{"Add"|localize}}</router-link>
    </p>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import { required, minValue, minLength } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "Record",
  metaInfo: {
    titleTemplate: "%s | Record"
  },
  components: { Loader },
  data() {
    return {
      select: null,
      isLoading: true,
      categoryId: null,
      type: "income",
      description: "",
      amount: null,
      categories: null,
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
        this.$customMessageToast("Record added successfully !");
      }
    }
  }
};
</script>

<style scoped></style>
