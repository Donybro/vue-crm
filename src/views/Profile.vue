<template>
  <div>
    <div class="page-title">
      <h3>{{"ProfileTitle" | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid :
            ($v.name.$dirty && !$v.name.required) || 
            ($v.name.$dirty && !$v.name.minLength)
          }"
        />
        <label for="description">{{'Name'|localize}}</label>
        <span
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
        >{{"Please write your name"|localize}}</span>
        <span
          v-if="$v.name.$dirty&& !$v.name.minLength"
          class="helper-text invalid"
        >{{"Name is too short"|localize}}</span>
      </div>
      <h6 class="grey-text darken-4">{{"InterfaceLangauage" |localize}} :</h6>
      <div class="switch">
        <label>
          Русский
          <input type="checkbox" v-model="isEnglishLang" />
          <span class="lever"></span>
          English
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{"Update"|localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Profile",
  metaInfo: {
    titleTemplate: "%s | Profile"
  },
  data: () => ({
    name: "",
    isEnglishLang: false
  }),
  computed: {
    ...mapGetters(["getUserInfo"])
  },
  validations: {
    name: { required, minLength: minLength(2) }
  },
  watch: {
    getUserInfo: {
      immediate: true,
      handler(userInfo) {
        this.name = userInfo.name;
      }
    }
  },
  methods: {
    ...mapActions(["updateUserInfo"]),
    updateTextFiels() {
      setTimeout(() => {
        window.M.updateTextFields();
      }, 0);
    },
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return null;
      }
      try {
        await this.updateUserInfo({
          name: this.name,
          locale: this.isEnglishLang ? "en-US" : "ru-RU"
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.updateTextFiels();
    this.isEnglishLang = this.getUserInfo.locale === "en-US";
  }
};
</script>

<style scoped>
.switch {
  margin: 5% 0;
}
</style>
