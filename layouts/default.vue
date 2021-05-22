<template>
  <div class="layout__app-wrapper">
    <header class="container container-outer">
      <nav>
        <nuxt-link to="/"> Home </nuxt-link>
        <CustomButton @click="openOverlay"> Login </CustomButton>
      </nav>
    </header>
    <Nuxt class="layout__container container container-outer" />
    <div class="overlay-background" v-if="overlay" @click="closeOverlay">
      <div class="overlay-content">Hello!</div>
    </div>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  name: "default",
  components: {
    CustomButton,
  },
  data() {
    return {
      overlay: false,
    };
  },
  methods: {
    openOverlay() {
      this.overlay = true;
    },
    closeOverlay() {
      this.overlay = false;
    },
  },
});
</script>

<style scoped>
footer {
  height: 10rem;
  width: 100%;
}

header {
  height: var(--height, 3rem);
  width: 100%;

  display: flex;
  align-items: center;
}

.layout__app-wrapper {
  min-height: 100vh;
  width: 100%;
}

.layout__container {
  min-height: calc(100vh - 15rem);
}
</style>