<template>
  <div class="input__container">
    <label :for="$attrs.id" class="input__label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      class="input__input"
      :vale="value"
      @input="emitValue"
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
  },
  data(): {
    value: string | number;
  } {
    return {
      value: "",
    };
  },
  methods: {
    emitValue(event: InputEvent) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },
  },
});
</script>