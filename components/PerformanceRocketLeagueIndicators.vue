<template>
  <span>
    <span>{{ performanceKey }}:</span>
    <span> {{ performanceValue }}</span> --
  </span>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

export default Vue.extend({
  props: {
    performanceData: {
      required: true,
    } as PropOptions<[string, string | number | undefined]>,
  },
  computed: {
    performanceKey(): string {
      return this.performanceData[0] ?? "n.a";
    },
    performanceValue(): string | number | undefined {
      return this.performanceData[1] ?? "n.a";
    },
  },
});
</script>

<style>
</style>