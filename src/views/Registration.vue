<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
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
        >
          Не корректный email
        </small>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
        >
          Введите email
        </small>
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
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >
          Введите пароль
        </small>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >
          Пароль должен состовлять не менее
          {{ $v.password.$params.minLength.min }} символов
        </small>
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
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >
          Введите имя
        </small>
        <small
          v-else-if="$v.name.$dirty && !$v.name.minLength"
          class="helper-text invalid"
        >
          Имя должно быть больше одной буквы
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
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
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <a href="/">Войти!</a>
      </p>
    </div>
  </form>
</template>

<script>
import { email, minLength, required } from "vuelidate/lib/validators";
import messages from "../plugins/messages";

export default {
  name: "Registration",
  data() {
    return {
      password: "",
      email: "",
      name: "",
      agree: false,
      isDisabled: false
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
        this.$customErrorToast(messages[erroeMsg]);
        this.$store.dispatch("clearCurrentError");
      }
    }
  },
  validations: {
    password: { required, minLength: minLength(6) },
    email: { email, required },
    name: { required, minLength: minLength(1) }
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
          name: this.name
        });
        result ? await this.$router.push("home?message=welcome") : null;
      }
    }
  }
};
</script>

<style scoped></style>
