<template>
  <div class="layout__app-wrapper">
    <header class="container container-outer">
      <nuxt-link to="/"> Home </nuxt-link>
      <CustomButton
        @click="openOverlay"
        v-if="!$auth.loggedIn"
        :class="{ hidden: onLoginPage }"
      >
        Login
      </CustomButton>
      <nuxt-link v-else to="/me"> Hello, {{ $auth.user.username }}!</nuxt-link>
    </header>
    <Nuxt class="layout__container container container-outer" />
    <transition name="fade">
      <CustomPopupLogin v-show="overlayOpen" />
    </transition>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "@/components/CustomButton.vue";
import CustomPopupLogin from "~/components/CustomPopupLogin.vue";

export default Vue.extend({
  name: "default",
  components: {
    CustomButton,
    CustomPopupLogin,
  },
  computed: {
    onLoginPage() {
      return this.$route.path.includes("login");
    },
    overlayOpen() {
      return this.$store.state.modalOpen;
    },
  },
  methods: {
    openOverlay() {
      this.$store.dispatch("setModalState", true);
    },
    closeOverlay() {
      this.$store.dispatch("setModalState", false);
    },
  },
});
</script>

<style scoped>
footer {
  height: 10rem;
  width: 100%;
}

.hidden {
  visibility: hidden;
}

header {
  height: var(--height, 3rem);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout__app-wrapper {
  min-height: 100vh;
  width: 100%;
}

.layout__container {
  min-height: calc(100vh - 15rem);
}
</style>