
<template>
  <div class="select__wrapper">
    <div class="select__display">
      <slot></slot>
    </div>
    <ul class="select__list">
      <li
        v-for="(option, index) in dspOptions"
        class="select__list-item"
        :key="option.id + '-' + index"
      >
        <input
          :type="type"
          style="display: none"
          :value="option"
          :name="option.dspName"
          :id="option.id"
          v-model="picks"
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
  props: {
    getDspValue: {
      type: Function,
      default: (value: any) => value,
    },
    getOptionId: {
      type: Function,
      default: (value: any, index: number) =>
        value?.id ? value?.id : value + "-" + index,
    },
    chosen: {
      type: Array,
      default: () => [],
    },
    multi: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      picks: this.chosen,
    };
  },
  watch: {
    chosen: {
      deep: true,
      handler() {
        this.picks = this.chosen;
      },
    },
  },
  methods: {
    allElementsAreSameType(type: string) {
      return this.options.every((option) => typeof option === type);
    },
  },
  computed: {
    type(): "radio" | "checkbox" {
      return this.multi ? "radio" : "checkbox";
    },
    dspOptions() {
      return this.options.map((option, index) => ({
        id: this.getOptionId(option, index),
        dspValue: this.getDspValue(option),
        value: option,
      }));
    },
  },
});
</script>

<style>
</style>