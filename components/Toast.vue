<template>
  <div class="toast-wrapper" :data-toast-id="id">
    <span>{{ message }} </span>
    <span @click="toggleVisibility">x</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    message: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  data(): {
    activeTimeout: null | NodeJS.Timeout;
  } {
    return {
      activeTimeout: null,
    };
  },
  methods: {
    toggleVisibility() {
      if (this.activeTimeout) {
        clearTimeout(this.activeTimeout);
      }
      this.$toast.remove(this.id);
    },
  },
  mounted() {
    setTimeout(() => this.toggleVisibility(), this.timeout);
  },
});
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  border-radius: 0.5rem;
  bottom: 4rem;
  left: 50%;

  padding: 1rem;
  background: var(--color-100);
  color: white;
  transform: translate(var(--transform-x), var(--transform-y));
  transition: var(--transition);

  --transform-x: -50%;
  --transform-y: 2rem;

  --transition: all 0.3s ease-out;
  opacity: 0;
}

.toast-wrapper.active {
  --transition: all 0.3s ease-in;
  --transform-y: 0;
  opacity: 1;
}
</style>