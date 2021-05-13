<template>
  <div class="input__container">
    <label :for="$attrs.id" class="input__label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      class="input__input"
      :value="value"
      @input="handleInput"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CustomInput",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  methods: {
    handleInput(event: InputEvent) {
      const value = (event.target as HTMLInputElement).value;
      this.emitValue(value);
    },
    emitValue(value: string | number) {
      this.$emit("input", value);
    },
  },
});
</script>

<style scoped>
.input__label {
  margin-bottom: 0.5em;
  display: inline-block;
}

input:required ~ label::after {
  content: "*";
}
</style>