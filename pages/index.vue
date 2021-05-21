<template>
  <div>
    <div>
      <nuxt-link to="/create">
        <h3>Create new Tournament</h3>
      </nuxt-link>
    </div>
    <TournamentList> My running Tournaments </TournamentList>
    <TournamentList :tournaments="tournaments">
      Running Tournaments
    </TournamentList>
    <!-- <TournamentList :tournaments="finishedTournaments">
      Past Tournaments
    </TournamentList> -->
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
    await Promise.all([
      store.dispatch("fetchTournaments"),
      store.dispatch("fetchResultConfigs"),
    ]);
    return {
      tournaments: store.state.tournaments,
    };
  },
  data() {
    return {
      tournaments: [] as ApiTournament<ApiPerformanceComponentName>[],
    };
  },
});
</script>
