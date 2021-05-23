<template>
  <div>
    <h1>{{ tournamentName }}</h1>

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
            :isOwn="isOwn"
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
  async asyncData({ $api, route, $auth }) {
    const tournamentId = route.params.id;

    let tournament = null;
    let isOwn = false;
    try {
      tournament = (await $api.tournaments.getOne(
        tournamentId
      )) as ApiTournament<ApiPerformanceComponentName>;

      const requestedByHost = $auth.user
        ? tournament.host === $auth.user.id
        : false;

      isOwn = requestedByHost;
    } catch (error) {
      console.error(error);
    }
    return {
      tournament,
      isOwn,
    };
  },
  data(): {
    tournament?: ApiTournament<ApiPerformanceComponentName> | null;
    isOwn?: boolean;
  } {
    return {};
  },
  computed: {
    tournamentName(): string {
      return this.tournament ? this.tournament.name : "Not Found";
    },
    games(): ApiGame<ApiPerformanceComponentName>[] {
      return this.tournament
        ? (this.tournament.games as ApiGame<ApiPerformanceComponentName>[])
        : [];
    },
  },
});
</script>