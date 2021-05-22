<template>
  <div>
    <h1>{{ tournament.name }}</h1>

    <h2>Matchups:</h2>
    <ul>
      <PerformanceTeamsWrapper
        v-for="(game, gIndex) of games"
        :key="gIndex"
        :game="game"
      >
        <template v-slot="{ performances }">
          <PerformanceRocketLeageForm
            v-for="(performance, index) of performances"
            :key="index"
            :performance="performance"
          />
        </template>
      </PerformanceTeamsWrapper>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import {
  ApiGame,
  ApiPerformanceComponentName,
  ApiTournament,
} from "~/types/types";

import PerformanceTeamsWrapper from "@/components/PerformanceTeamsWrapper.vue";
import PerformanceRocketLeageForm from "@/components/PerformanceRocketLeageForm.vue";

export default Vue.extend({
  name: "Tournament",
  components: {
    PerformanceTeamsWrapper,
    PerformanceRocketLeageForm,
  },
  async asyncData({ $api, route }) {
    const tournamentId = route.params.id;

    const tournament = await $api.tournaments.getOne(tournamentId);
    return {
      tournament,
    };
  },
  data(): {
    tournament: ApiTournament<ApiPerformanceComponentName> | null;
  } {
    return {
      tournament: null,
    };
  },
  computed: {
    games(): ApiGame<ApiPerformanceComponentName>[] {
      return this.tournament
        ? (this.tournament.games as ApiGame<ApiPerformanceComponentName>[])
        : [];
    },
  },
});
</script>