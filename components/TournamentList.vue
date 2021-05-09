<template>
  <div>
    <h2><slot /></h2>
    <ul class="tournaments__list" v-if="tournaments.length">
      <li
        class="tournaments__list-item item"
        v-for="(tournament, index) in tournaments"
        :key="index"
      >
        <nuxt-link :to="baseUrl + tournament.id">
          {{ tournament.name }}
        </nuxt-link>
      </li>
    </ul>
    <ul class="tournaments__list" v-else>
      <li class="tournaments__list-item empty">
        No Tournaments for this Category
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TournamentList",
  props: {
    tournaments: {
      type: Array,
      default: () => [],
    },
    baseUrl: {
      type: String,
      default: "/",
      validator: (baseUrl) => baseUrl.startsWith("/"),
    },
  },
});
</script>

<style scoped>
</style>