
<template>
  <div class="select__wrapper">
    <label
      class="select__label"
      :class="{ required: isRequired }"
      :for="$attrs.id"
      >{{ label }}</label
    >
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
      type: [Array, Number, String, Object],
      default: () => [],
    },
    getDspValue: {
      type: Function,
      default: (option: any) => option,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    } as PropOptions<any[]>,
  },
  data() {
    return {
      picks: this.value ? this.value : this.options[0],
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
        this.emitPicks();
      },
    },
  },
  computed: {
    isRequired(): boolean {
      return this.$attrs.required !== undefined;
    },
  },
  methods: {
    emitPicks() {
      this.$emit("input", this.picks);
    },
  },
});
</script>

<style scoped>
label.required::after {
  content: "*";
}
</style>