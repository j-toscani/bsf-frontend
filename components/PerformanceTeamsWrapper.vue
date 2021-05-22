<template>
  <li>
    <div>
      <h4>
        <span> {{ game.name_team_a }} </span> :
        <span> ({{ game.teams.team_a | getTeamMembers }}) </span>

        <strong>vs</strong>

        <span> {{ game.name_team_b }} </span> :
        <span>({{ game.teams.team_b | getTeamMembers }})</span>
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
  ApiPerformance,
  ApiPerformanceComponentName,
  ApiPlayer,
} from "~/types/types";

export default Vue.extend({
  props: {
    game: {
      type: Object,
      required: true,
    } as PropOptions<ApiGame<ApiPerformanceComponentName>>,
  },
  filters: {
    getTeamMembers(value: ApiPlayer[]) {
      const tagsOfTeamMembers = value.map((player) => player.gamertag);
      return tagsOfTeamMembers.join(", ");
    },
  },
  computed: {
    performances(): ApiPerformance<ApiPerformanceComponentName>[] {
      return this.game.performances;
    },
  },
});
</script>

<style scoped>
</style>