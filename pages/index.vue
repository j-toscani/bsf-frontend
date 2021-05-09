<template>
  <div>
    <div>
      <nuxt-link to="/create">
        <h3>Create new Tournament</h3>
      </nuxt-link>
    </div>
    <div>
      <h2>Edit your Running Tournaments</h2>
      <ul class="tournaments__list container">
        <li>No Tournaments available</li>
      </ul>
    </div>

    <div>
      <h2>Past Tournament Results</h2>
      <ul class="tournaments__list container">
        <li
          class="tournaments__list-item item"
          v-for="(tournament, index) in finishedTournaments"
          :key="index"
        >
          <nuxt-link :to="'/' + tournament.id">
            {{ tournament.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
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
