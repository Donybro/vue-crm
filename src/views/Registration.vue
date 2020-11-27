<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"Home accounting" | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
        >{{"email is uncorrect" | localize}}</small>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >{{ "please write your email"|localize}}</small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="password"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.password.required) ||
              ($v.email.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">{{"Password"|localize}}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >{{"Put your password"}}</small>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >{{ "Password must be longer than" | localize $v.password.$params.minLength.min }}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) ||
              ($v.name.$dirty && !$v.name.minLength)
          }"
        />
        <label for="name">{{"Name"|localize}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{"Write your name"|localize}}</small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
        >{{"Name must have more than 1 symbol" | localize}}</small>
      </div>
      <div class="input-field">
        <money
          id="bill"
          v-model.number="bill"
          v-bind="money"
          :class="{
            invalid:
              ($v.bill.$dirty && !$v.bill.required) ||
              ($v.bill.$dirty && !$v.bill.minValue)
          }"
        >{{bill}}</money>
        <label for="bill">{{"Initial bill in UZS"|localize}}</label>
        <small
          v-if="$v.bill.$dirty && !$v.bill.required"
          class="helper-text invalid"
        >{{"Write your initial bill in UZS"|localize}}</small>
        <small
          v-else-if="$v.bill.$dirty && !$v.bill.minValue"
          class="helper-text invalid"
        >{{"Initial bill should be more than 1000 UZS" | localize}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{"Agree"|localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
          :disabled="isDisabled"
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{"Sign in"|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Have`t an account?"}}
        <a href="/">{{"Login"| localize }}</a>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required, minValue } from "vuelidate/lib/validators";
export default {
  name: "Registration",
  metaInfo: {
    titleTemplate: "%s | Registration"
  },
  data() {
    return {
      password: "",
      email: "",
      name: "",
      agree: false,
      isDisabled: false,
      bill: null,
      money: {
        decimal: ".",
        thousands: ",",
        prefix: "   ",
        suffix: "  UZS",
        precision: 0,
        masked: false
      }
    };
  },
  computed: {
    error() {
      return this.$store.getters.getCurrentError;
    }
  },
  watch: {
    error(erroeMsg) {
      if (erroeMsg) {
        this.$customErrorToast(erroeMsg);
        this.$store.dispatch("clearCurrentError");
      }
    },
    bill(val) {
      console.log(val);
    }
  },
  validations: {
    password: { required, minLength: minLength(6) },
    email: { email, required },
    name: { required, minLength: minLength(1) },
    bill: { required, minValue: minValue(1000) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      if (this.agree) {
        this.isDisabled = true;
        const result = await this.$store.dispatch("registration", {
          email: this.email,
          password: this.password,
          name: this.name,
          bill: this.bill
        });
        result ? await this.$router.push("home?message=welcome") : null;
      }
    }
  }
};
</script>

<style scoped></style>
