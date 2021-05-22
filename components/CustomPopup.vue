<template>
  <div class="overlay-wrapper">
    <div class="overlay-background" @click="emitClose"></div>
    <div class="overlay-content">
      <slot />
      <CustomButton
        level="tertiary"
        size="small"
        class="close-button"
        @click="emitClose"
      >
        X
      </CustomButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "./CustomButton.vue";
export default Vue.extend({
  components: { CustomButton },
  methods: {
    emitClose() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
.overlay-wrapper,
.overlay-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-wrapper {
  z-index: var(--z-index-max);
}

.overlay-background {
  background: rgba(var(--color-font-rgb), 0.5);
  z-index: -1;
}

.overlay-content {
  padding: 2rem;
  position: relative;
  background: var(--color-font-inverse);
  border-radius: 0.5rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.4);
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>