
<template>
  <div class="select__wrapper">
    <div class="select__display"></div>
    <ul class="select__list">
      <li
        class="select__list-item"
        v-for="(option, index) in dspOptions"
        :key="option.id + '-' + index"
      >
        <input
          :type="type"
          style="display: none"
          :name="option.dspName"
          :id="option.id"
        />
        <label :for="option.id"> {{ option.dspValue }} </label>
        <div class="select__list-item-dspbox"></div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CustomCheckbox",
  props: {
    value: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
});
</script>