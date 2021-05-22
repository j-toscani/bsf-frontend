<template>
  <li>
    <strong> {{ performance.player.gamertag }} </strong>
    <div>
      <span v-for="(touple, index) in performanceIndicatorTouples" :key="index">
        <span>{{ touple[0] }}:</span>
        <span> {{ touple[1] }}</span> --
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ApiPerformance, PerformancePoints } from "~/types/types";

export default Vue.extend({
  props: {
    performance: {
      type: Object,
      required: true,
    } as PropOptions<ApiPerformance<"results.rocket-league">>,
  },
  computed: {
    performanceIndicatorTouples(): [string, number | string | undefined][] {
      return Object.entries(this.performanceIndicators);
    },
    performanceIndicators(): Partial<PerformancePoints> {
      const stats = this.performance.stats[0];

      return {
        points: stats.points,
        goals: stats.goals,
        assists: stats.assists,
        saves: stats.saves,
        shots: stats.shots,
      };
    },
  },
});
</script>

<style>
h4 {
  display: inline-block;
}
</style>