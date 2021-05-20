<template>
  <section>
    <h2>This is the Teams Page.</h2>
    <button @click="handleTeamCountButtonClick">Toggle Teamcount</button>
    <CustomSelect
      label="Team Size"
      :options="teamOptions"
      v-model="teamSize"
      :getDspValue="getTeamTypeName"
    />
    <ol>
      <li v-for="(team, tIndex) in teams" :key="'team' + tIndex">
        <h4>{{ team.name }}</h4>
        <ul class="has-list-style" style="padding: 0">
          <li
            v-for="(slot, cIndex) in slotsInTeams"
            :key="'team' + tIndex + 'contestant' + cIndex"
          >
            {{ team.players[slot] ? team.players[slot].gamertag : "---" }}
          </li>
        </ul>
      </li>
    </ol>
    <span v-if="!allTeamsAreFilled"> You have teams with empty slots. </span>
    <span v-if="numberOfTeams <= 1"> Not enough Teams for a Tournament. </span>
    <div v-if="overflowingContestants.length">
      <span> You are missing free slots for these Users: </span>
      <ul class="has-list-style">
        <li v-for="(user, index) in overflowingContestants" :key="index">
          {{ user.gamertag }}
        </li>
      </ul>
    </div>
    <CustomButton size="big" level="tertiary" @click="handleCreateTournament">
      Create Tournament
    </CustomButton>
    <CustomButton size="big" level="tertiary">
      Create Matches for Tournament
    </CustomButton>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { Team } from "@/types/types";

import CustomSelect from "~/components/CustomSelect.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  components: { CustomSelect, CustomButton },
  name: "Teams",
  asyncData({ store }) {
    store.dispatch("create/setTeamSize", 1);
    return {
      teamSize: store.state.create.teamOptions[0],
      teamOptions: store.state.create.teamOptions,
    };
  },
  watch: {
    teamSize(teamSize) {
      this.$store.dispatch("create/setTeamSize", teamSize.value);
    },
  },
  computed: {
    ...mapGetters({
      allTeamsAreFilled: "create/allTeamsAreFilled",
      numberOfTeams: "create/numberOfTeams",
      overflowingContestants: "create/overflowingContestants",
    }),
    teams(): Team[] {
      return this.$store.state.create.teams;
    },
    slotsInTeams(): number[] {
      const teamSize = this.$store.state.create.teamSize;
      return Array.from(new Array(teamSize), (_e, i) => i);
    },
  },
  methods: {
    getTeamTypeName(data: { name: string; value: number }) {
      return data.name;
    },
    handleTeamCountButtonClick() {
      this.$store.dispatch("create/toggleTeamCount");
    },
  },
});
</script>

<style scoped>
</style>