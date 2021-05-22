<template>
  <div class="overlay-background" @click="emitClose">
    <div class="overlay-content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    emitClose() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
.overlay-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  background: rgba(var(--color-font-rgb), 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-content {
  padding: 2rem;
  background: var(--color-font-inverse);
}
</style>