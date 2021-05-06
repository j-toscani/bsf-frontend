<template>
  <div class="input__container">
    <label :for="$attrs.id" class="input__label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      class="input__input"
      :vale="value"
      @input="$emit('input', value)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "CustomTextInput",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data(): {
    value: string;
  } {
    return {
      value: "",
    };
  },
});
</script>

<style>
</style>