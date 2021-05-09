<template>
  <div class="input__container">
    <label :for="$attrs.id" class="input__label">
      {{ label }}
    </label>
    <div class="autocomplete__wrapper">
      <input
        v-bind="$attrs"
        class="input__input"
        :autocomplete="!hasOptions"
        :vale="value"
        @input="handleInput"
      />
      <ul
        class="autocomplete__list"
        :class="{ 'hide-list': chosen }"
        v-if="hasOptions"
      >
        <li
          class="autocomplete__list-item"
          @click="handleOptionClick(option)"
          v-for="(option, index) in filteredOptions"
          :key="index"
        >
          {{ option }}
        </li>
      </ul>
    </div>
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
      default: () => [],
    } as PropOptions<string[]>,
  },
  data(): {
    value: string | number;
    open: boolean;
  } {
    return {
      open: false,
      value: "",
    };
  },
  computed: {
    hasOptions(): boolean {
      return this.options.length > 0;
    },
    chosen(): boolean {
      return this.options.findIndex((value) => value === this.value) !== -1;
    },
    filteredOptions(): string[] {
      if (typeof this.value === "number") {
        return this.options;
      }
      return this.options.filter((option) =>
        option.includes(this.value as string)
      );
    },
  },
  methods: {
    handleOptionClick(option: string | number) {
      this.setValue(option);
      this.emitValue(option);
    },
    setValue(value: string | number) {
      this.value = value;
    },
    clearValue() {
      this.value = typeof this.value === "string" ? "" : 0;
    },
    handleInput(event: InputEvent) {
      const value = (event.target as HTMLInputElement).value;
      this.setValue(value);
      this.emitValue(value);
    },
    emitValue(value: string | number) {
      this.$emit("input", value);
    },
  },
});
</script>

<style scoped>
.autocomplete__wrapper {
  position: relative;
  width: fit-content;
}

.autocomplete__list {
  position: absolute;
  left: 0;
  top: 100%;
  min-width: calc(100% - 1px);

  display: flex;
  opacity: 0;
  pointer-events: none;
  flex-direction: column;

  background: white;
  gap: 0.5rem;

  padding: 0.5rem 0.5rem;
  z-index: 1;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.3);
}

.hide-list {
  transform: scaleY(0);
}

.autocomplete__list-item {
  padding: 0.25rem;
  cursor: pointer;
}
.autocomplete__list-item:hover {
  background: var(--color-200);
  color: white;
}

.input__container:focus-within .autocomplete__list,
.autocomplete__list:hover {
  pointer-events: all;
  opacity: 1;
}

input:required ~ label::after {
  content: "*";
}
</style>