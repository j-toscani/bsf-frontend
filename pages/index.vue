<template>
  <div>
    <h3>
      <nuxt-link to="/create"> Create new Tournament </nuxt-link>
    </h3>

    <TournamentList v-if="myTournaments.length" :tournaments="myTournaments">
      My running Tournaments:
    </TournamentList>
    <TournamentList
      v-if="allOtherTournaments.length"
      :tournaments="allOtherTournaments"
    >
      Running Tournaments:
    </TournamentList>
    <TournamentList
      v-if="endedTournaments.length"
      :tournaments="allOtherTournaments"
    >
      Past Tournaments:
    </TournamentList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TournamentList from "@/components/TournamentList.vue";
import { ApiPerformanceComponentName, ApiTournament } from "~/types/types";

export default Vue.extend({
  components: {
    TournamentList,
  },
  async asyncData({ store }) {
    await Promise.all([store.dispatch("fetchTournaments")]);
    return {
      tournaments: store.state.tournaments,
    };
  },
  data() {
    return {
      tournaments: [] as ApiTournament<ApiPerformanceComponentName>[],
    };
  },
  computed: {
    myTournaments(): ApiTournament<ApiPerformanceComponentName>[] {
      return this.tournaments.filter((tournament) => {
        if (!tournament.active) {
          return false;
        }
        return this.$auth.user ? tournament.host === this.$auth.user.id : false;
      });
    },
    allOtherTournaments(): ApiTournament<ApiPerformanceComponentName>[] {
      return this.tournaments.filter((tournament) => {
        if (!tournament.active) {
          return false;
        }
        return this.$auth.user ? tournament.host !== this.$auth.user.id : true;
      });
    },
    endedTournaments(): ApiTournament<ApiPerformanceComponentName>[] {
      return this.tournaments.filter((tournament) => !tournament.active);
    },
  },
});
</script>
