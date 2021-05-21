<template>
  <div>
    <h1>{{ tournament.name }}</h1>
    <h2>Contestants:</h2>
    <ul class="has-list-style">
      <li v-for="(contenstant, index) in contestants" :key="index">
        {{ contenstant.gamertag }}
      </li>
    </ul>
    <h2>Matchups:</h2>
    <ul>
      <li v-for="(game, index) in games" :key="index">
        <div>
          <span>
            <span> {{ game.name_team_a }} </span> :
            <span> ({{ game.teams.team_a | getTeamMembers }}) </span>
          </span>
          <strong>vs</strong>
          <span>
            <span> {{ game.name_team_b }} </span> :
            <span>({{ game.teams.team_b | getTeamMembers }})</span>
          </span>
          <ul>
            <li v-for="(performance, index) in game.performances" :key="index">
              {{ performance | getDspStats }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  ApiGame,
  ApiPerformance,
  ApiPerformanceComponentName,
  ApiPlayer,
  ApiTournament,
} from "~/types/types";
export default Vue.extend({
  name: "Tournament",
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
  filters: {
    getTeamMembers(value: ApiPlayer[]) {
      const tagsOfTeamMembers = value.map((player) => player.gamertag);
      return tagsOfTeamMembers.join(", ");
    },
    getDspStats(value: ApiPerformance<ApiPerformanceComponentName>) {
      const { points, goals, assists, saves, shots } = value.stats[0];

      return {
        points,
        goals,
        assists,
        saves,
        shots,
      };
    },
  },
  computed: {
    contestants(): ApiPlayer[] {
      return this.tournament ? this.tournament.contestants : [];
    },
    games(): ApiGame<ApiPerformanceComponentName>[] {
      return this.tournament
        ? (this.tournament.games as ApiGame<ApiPerformanceComponentName>[])
        : [];
    },
  },
});
</script>

<style>
</style>