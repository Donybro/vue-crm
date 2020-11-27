<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"Home accounting" | localize}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
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
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{"Login"|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Have`t an account?"|localize}}
        <router-link to="/registration">{{"Sign in"|localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  metaInfo: {
    titleTemplate: "%s | Login"
  },
  data() {
    return {
      password: "",
      email: ""
    };
  },
  validations: {
    password: { required, minLength: minLength(6) },
    email: { email, required }
  },
  computed: {
    error() {
      return this.$store.getters.getCurrentError;
    }
  },
  watch: {
    error(errorMsg) {
      if (errorMsg) {
        this.$customErrorToast(errorMsg);
        this.$store.dispatch("clearCurrentError");
      }
    }
  },
  mounted() {
    this.$route.query.message
      ? this.$customMessageToast(this.$route.query.message)
      : null;
    this.$route.query.error
      ? this.$customErrorToast(this.$route.query.error)
      : null;
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      const result = await this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
      result ? await this.$router.push("/home?message=welcome") : null;
    }
  }
};
</script>

<style scoped></style>
