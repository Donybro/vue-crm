<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a class="pointer" @click="$emit('toggle-navbar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date("datetime") }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            ref="dropdownRef"
            data-target="dropdown"
          >
            {{ userInfo.name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a class="black-text" @click="logout">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      date: null,
      dateInstance: null,
      dropdownInstance: null
    };
  },
  methods: {
    logout() {
      this.$router.push("/login?message=logout");
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  },
  mounted() {
    this.dropdownInstance = window.M.Dropdown.init(this.$refs.dropdownRef);
    this.dateInstance = setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.dateInstance);
    this.dropdownInstance && this.dropdownInstance.destroy
      ? this.dropdownInstance.destroy()
      : null;
  }
};
</script>

<style scoped></style>
