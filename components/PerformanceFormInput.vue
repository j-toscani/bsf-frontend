<template>
  <CustomInput
    style="display: inline-block"
    :label="performanceKey"
    :id="inputId"
    v-model="value"
    :type="inputType"
  />
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import CustomInput from "./CustomInput.vue";

export default Vue.extend({
  components: { CustomInput },
  props: {
    performanceData: {
      required: true,
    } as PropOptions<[string, string | number | undefined]>,
    pId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: this.performanceData[1],
    };
  },
  watch: {
    value(newVal, oldVal) {
      let emitValue = newVal;

      if (this.inputType === "number") {
        emitValue = emitValue === "" ? 0 : parseInt(emitValue);
      }

      if (newVal !== oldVal) {
        this.$emit("input", [this.performanceKey, emitValue]);
      }
    },
  },
  computed: {
    inputId(): string {
      return this.pId + "_" + this.performanceKey;
    },
    performanceKey(): string {
      return this.performanceData[0] ?? "n.a";
    },
    inputType(): string {
      return typeof this.performanceValue === "number" ? "number" : "text";
    },
    performanceValue(): string | number | undefined {
      return this.performanceData[1] ?? "n.a";
    },
  },
});
</script>

<style>
</style>