
<template>
  <div class="checkbox__wrapper">
    <input
      style="display: none"
      type="checkbox"
      v-bind="$attrs"
      :value="value"
    />
    <label class="checkbox__label" :for="$attrs.id">
      <span> {{ label }} </span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CustomCheckbox",
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.checkbox__label::after {
  content: "\.";
  line-height: 1;
  border-radius: 5px;

  display: inline-flex;
  align-content: center;
  justify-content: center;
  background: white;
  color: white;

  border: 1px solid var(--color-100, #ddd);
  height: 1.25em;
  width: 1.25em;
}

input[type="checkbox"]:checked + .checkbox__label::after,
input[type="radio"]:checked + .checkbox__label::after {
  content: "\002714";
  color: inherit;
}
</style>