<template>
  <div>
    <h1>{{ tournament.name }}</h1>

    <h2>Matchups:</h2>
    <ul>
      <li v-for="(game, index) in games" :key="index">
        <div>
          <h4>
            <span> {{ game.name_team_a }} </span> :
            <span> ({{ game.teams.team_a | getTeamMembers }}) </span>

            <strong>vs</strong>

            <span> {{ game.name_team_b }} </span> :
            <span>({{ game.teams.team_b | getTeamMembers }})</span>
          </h4>
          <ul style="max-width: 100ch">
            <li
              v-for="(performance, index) in game.performances"
              :key="index"
              style="display: flex"
            >
              <strong> {{ performance.player.gamertag }} </strong>
              <div style="margin-left: auto">
                <span
                  v-for="(touple, index) in Object.entries(
                    getPerformanceIndicators(performance)
                  )"
                  :key="index"
                >
                  <span>{{ touple[0] }}:</span>
                  <span> {{ touple[1] }}</span> --
                </span>
              </div>
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
  PerformancePoints,
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
  methods: {
    getPerformanceIndicators(
      performance: ApiPerformance<ApiPerformanceComponentName>
    ): Partial<PerformancePoints> {
      const { points, goals, assists, saves, shots } = performance.stats[0];

      return {
        points,
        goals,
        assists,
        saves,
        shots,
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