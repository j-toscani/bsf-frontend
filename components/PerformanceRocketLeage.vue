<template>
  <li>
    <strong> {{ performance.player.gamertag }} </strong>
    <div>
      <PerformanceRocketLeagueIndicators
        v-for="(performanceData, index) in performanceIndicatorTouples"
        :key="index"
        :performanceData="performanceData"
      />
    </div>
  </li>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { ApiPerformance, PerformancePoints } from "~/types/types";
import PerformanceRocketLeagueIndicators from "./PerformanceRocketLeagueIndicators.vue";

export default Vue.extend({
  components: { PerformanceRocketLeagueIndicators },
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