<template>
  <div class="input__container" @keydown="handleKeyPress">
    <label :for="$attrs.id" class="input__label">
      {{ label }}
    </label>
    <div class="autocomplete__wrapper">
      <input
        v-bind="$attrs"
        class="input__input"
        autocomplete="off"
        ref="input"
        :value="value"
        @input="handleInput"
      />
      <ul class="autocomplete__list" v-if="autocompleteOpen">
        <li
          tabindex="-1"
          class="autocomplete__list-item"
          ref="options"
          @click="handleOptionClick(option)"
          v-for="(option, index) in filteredOptions"
          :key="index"
        >
          {{ getDspValue(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Player } from "~/types/types";

export default Vue.extend({
  name: "CustomInputWithAutocomplete",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    getDspValue: {
      type: Function,
      default: (option: any) => option,
    } as PropOptions<(val: any) => string>,
    options: {
      type: Array,
      default: () => [],
    } as PropOptions<Player[]>,
  },
  data(): {
    autocompleteShouldShow: boolean;
    focusing: number;
  } {
    return {
      focusing: -1,
      autocompleteShouldShow: false,
    };
  },
  watch: {
    focusing(val: number) {
      if (!(this.$refs.options as HTMLLIElement[]).length) {
        return;
      }

      if (val === -1) {
        (this.$refs.input as HTMLInputElement).focus();
        return;
      }
      (this.$refs.options as HTMLLIElement[])[val].focus();
    },
  },
  computed: {
    autocompleteOpen(): boolean {
      return (
        this.options.length > 0 &&
        this.filteredOptions.length > 0 &&
        this.autocompleteShouldShow
      );
    },
    isFocusing(): boolean {
      return this.focusing !== -1;
    },
    chosen(): boolean {
      const compareValues = (value: any) =>
        this.getDspValue(value) === this.value;

      return this.options.findIndex(compareValues) !== -1;
    },
    filteredOptions(): Player[] {
      if (typeof this.value === "number") {
        return this.options;
      }
      return this.options.filter((option) =>
        this.getDspValue(option).includes(this.value as string)
      );
    },
  },
  methods: {
    handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.handleArrowUpPress();
          break;
        case "ArrowUp":
          e.preventDefault();
          this.handleArrowDownPress();
          break;
        case "Escape":
          this.handleEscapePress();
          break;
        case "Enter":
          // If only one option is available, submit form
          const onlyOneOptionAvailable = this.filteredOptions.length === 1;
          const singleOptionWasPicked =
            this.getDspValue(this.filteredOptions[0]) === this.value;

          if (onlyOneOptionAvailable && singleOptionWasPicked) {
            return;
          }

          e.preventDefault();
          this.handleEnterPress();
          break;

        default:
          break;
      }
    },
    handleEnterPress() {
      const dspValue = this.getDspValue(this.filteredOptions[this.focusing]);
      this.emitValue(dspValue);
      this.focusing = -1;
    },
    handleArrowUpPress() {
      const isOnTop = this.focusing === this.filteredOptions.length - 1;

      if (!this.isFocusing || isOnTop) {
        this.focusing = 0;
        return;
      }

      this.focusing++;
    },
    handleArrowDownPress() {
      const isOnBottom = this.focusing === -1;

      if (!this.isFocusing || isOnBottom) {
        this.focusing = this.filteredOptions.length - 1;
        return;
      }

      this.focusing--;
    },
    handleEscapePress() {
      this.closeList();
      (this.$refs.input as HTMLInputElement).focus();
    },
    closeList() {
      this.autocompleteShouldShow = false;
    },
    openList() {
      this.autocompleteShouldShow = true;
    },
    handleOptionClick(option: Player) {
      const dspValue = this.getDspValue(option);
      this.emitValue(dspValue);
      this.closeList();
    },
    handleInput(event: InputEvent) {
      this.openList();
      const value = (event.target as HTMLInputElement).value;
      this.emitValue(value);
    },
    emitValue(value: string) {
      this.$emit("input", value);
    },
  },
  mounted() {
    document.addEventListener("click", this.closeList);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeList);
  },
});
</script>

<style scoped>
.input__label {
  margin-bottom: 0.5em;
  display: inline-block;
}

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
  flex-direction: column;

  background: white;
  gap: 0.5rem;

  padding: 0.5rem 0.5rem;
  z-index: 1;
  box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.3);
}

.autocomplete__list-item {
  padding: 0.25rem;
  cursor: pointer;
}

.autocomplete__list-item:focus {
  background: var(--color-100);
  color: white;
}

.autocomplete__list-item:hover {
  background: var(--color-200);
  color: white;
}

input:required ~ label::after {
  content: "*";
}
</style>