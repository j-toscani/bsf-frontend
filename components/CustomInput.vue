<template>
  <div class="input__container">
    <label :for="$attrs.id" class="input__label">
      {{ label }}
    </label>
    <input
      v-bind="$attrs"
      class="input__input"
      :autocomplete="!hasOptions"
      :vale="value"
      @input="emitValue"
    />
    <datalist v-if="hasOptions" :id="$attrs.list">
      <option v-for="(option, index) in options" :value="option" :key="index">
        {{ option }}
      </option>
    </datalist>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
  name: "CustomInput",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: [],
    } as PropOptions<string[]>,
  },
  data(): {
    value: string | number;
  } {
    return {
      value: "",
    };
  },
  computed: {
    hasOptions(): boolean {
      return this.options.length > 0;
    },
  },
  methods: {
    emitValue(event: InputEvent) {
      this.$emit("input", (event.target as HTMLInputElement).value);
    },
  },
});
</script>