<template>
  <button :class="type" @click="handleClick"><slot /></button>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: "primary",
    } as PropOptions<"primary" | "secondary" | "tertiary">,
  },
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
});
</script>

<style scoped>
button {
  padding: 0.5em 1em;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
}

button:disabled {
  opacity: 0.75;
}

.primary {
  background: var(--color-100);
  color: white;
}

.secondary {
  border: 1px solid var(--color-200);
  color: var(--color-200);
  background: white;
}

.tertiary {
  background: var(--color-300);
  color: white;
}
</style>