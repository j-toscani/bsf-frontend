
<template>
  <div class="checkbox__wrapper">
    <input
      class="checkbox__input"
      style="display: none"
      v-bind="$attrs"
      :value="value"
    />
    <label class="checkbox__label" :for="$attrs.id"> {{ label }} </label>
    <div class="checkbox__dspbox"></div>
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