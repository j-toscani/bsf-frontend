<template>
  <div>
    <div>
      <nuxt-link to="/create">
        <h3>Create new Tournament</h3>
      </nuxt-link>
    </div>
    <TournamentList> My running Tournaments </TournamentList>
    <TournamentList :tournaments="runningTournaments">
      Running Tournaments
    </TournamentList>
    <TournamentList :tournaments="finishedTournaments">
      Past Tournaments
    </TournamentList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import TournamentList from "@/components/TournamentList.vue";

export default Vue.extend({
  components: {
    TournamentList,
  },
  data() {
    return {
      tournaments: [
        {
          name: "Awesome Tournament",
          running: true,
          id: 1,
        },
        {
          name: "Awesome Tournament",
          running: false,
          id: 2,
        },
        {
          name: "Awesome Tournament",
          running: true,
          id: 3,
        },
        {
          name: "Awesome Tournament",
          running: true,
          id: 4,
        },
        {
          name: "Awesome Tournament",
          running: false,
          id: 5,
        },
        {
          name: "Awesome Tournament",
          running: true,
          id: 6,
        },
      ],
    };
  },
  computed: {
    runningTournaments(): any[] {
      return this.tournaments.filter((tournament) => tournament.running);
    },
    finishedTournaments(): any[] {
      return this.tournaments.filter((tournament) => !tournament.running);
    },
  },
});
</script>
