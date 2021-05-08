
<template>
  <div class="select__wrapper">
    <label class="select__label" :for="$attrs.id">{{ label }}</label>
    <select class="select__input" v-bind="$attrs" v-model="picks">
      <option
        class="select__option"
        v-for="(option, index) in options"
        :key="index"
        :value="option"
      >
        {{ getDspValue(option) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  inheritAttrs: false,
  name: "CustomSelect",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    getDspValue: {
      type: Function,
      default: (option: any) => {
        option;
      },
    },
    options: {
      type: Array,
      default: () => [],
    } as PropOptions<any[]>,
  },
  data() {
    return {
      picks: this.value,
    };
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.picks = this.value;
      },
    },
    picks: {
      deep: true,
      handler() {
        this.$emit("input", this.picks);
      },
    },
  },
});
</script>

<style>
</style>