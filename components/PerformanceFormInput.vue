<template>
  <CustomInput
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
      type: Object,
      required: true,
    } as PropOptions<[string, string | number | undefined]>,
    pId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: this.performanceData,
    };
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