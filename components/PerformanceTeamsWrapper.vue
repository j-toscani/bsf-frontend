<template>
  <li>
    <div>
      <h4>
        {{ performanceHeadline }}
      </h4>
      <ul>
        <slot v-bind="{ performances }" />
      </ul>
    </div>
  </li>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

import {
  ApiGame,
  ApiGameTeam,
  ApiPerformance,
  ApiPerformanceComponentName,
} from "~/types/types";

export default Vue.extend({
  props: {
    game: {
      type: Object,
      required: true,
    } as PropOptions<ApiGame<ApiPerformanceComponentName>>,
  },
  computed: {
    performances(): ApiPerformance<ApiPerformanceComponentName>[] {
      return this.game.performances;
    },
    performanceHeadline(): string {
      const teamData = this.getTeamData();
      return teamData.map(this.createPerformanceHeadline).join(" vs ");
    },
  },
  methods: {
    getPlayerNames(team: ApiGameTeam<ApiPerformanceComponentName>) {
      return team.players.map((player) => player.gamertag);
    },
    createPerformanceHeadline(team: { name: string; playerNames: string[] }) {
      return `${team.name} (${team.playerNames.join(", ")})`;
    },
    getTeamData() {
      return this.game.teams.map((team) => ({
        name: team.name,
        playerNames: this.getPlayerNames(team),
      }));
    },
  },
});
</script>

<style scoped>
</style>