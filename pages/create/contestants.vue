<template>
  <main>
    <h2 class="page-title">This is the Contestants page.</h2>
    <form
      id="createNewContestant"
      class="contestantslist__add-contestant"
      @submit.prevent="createNewContestant"
    >
      <CustomInput
        label="Create new Contestant"
        v-model="newContestant"
        id="newContestant"
      />
      <CustomButton
        level="tertiary"
        type="submit"
        form="createNewContestant"
        class="contestantslist__add-contestant-button"
      >
        CREATE
      </CustomButton>
    </form>
    <form
      class="contestantslist__add-contestant"
      @submit.prevent="addToRoster"
      id="addContestant"
    >
      <CustomInputWithAutocomplete
        label="Add Contestant from Database"
        id="pick"
        type="text"
        v-model="pick"
        :options="remainingPicks"
      />
      <CustomButton
        :disabled="!pickExists"
        level="tertiary"
        form="addContestant"
        class="contestantslist__add-contestant-button"
      >
        ADD
      </CustomButton>
    </form>

    <ul class="contestantslist__list">
      <li
        class="contestantslist__list-item"
        v-for="(contestant, index) in dspRoster"
        :key="index"
      >
        <CustomButton
          @click="deleteFromRoster(index)"
          level="secondary"
          size="small"
          style="margin-right: 0.5rem"
        >
          ✖</CustomButton
        >
        <span>{{ contestant }} </span>
      </li>
    </ul>
    <nav>
      <nuxt-link class="form__next-link" to="/create/teams" v-if="valid">
        Next
      </nuxt-link>
      <span class="form__next-link disabled" v-else> Next </span>
    </nav>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { Contestant } from "@/types/types";
import { mapGetters } from "vuex";

import CustomInputWithAutocomplete from "@/components/CustomInputWithAutocomplete.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  name: "Contestants",
  components: {
    CustomInputWithAutocomplete,
    CustomButton,
    CustomInput,
  },
  data(): {
    pick: string;
    newContestant: string;
  } {
    return {
      pick: "",
      newContestant: "",
    };
  },
  methods: {
    addToRoster() {
      this.$store.dispatch("create/addToRoster", this.pick);
      this.pick = "";
    },
    createNewContestant() {
      this.$toast.add(`${this.newContestant} was added.`);
      this.$store.dispatch("create/addToContestants", this.newContestant);
      this.newContestant = "";
    },
    deleteFromRoster(index: number) {
      this.$store.dispatch("create/deleteFromRoster", index);
    },
  },
  computed: {
    ...mapGetters({
      valid: "create/hasMinAmmountOfContestants",
      remainingPicks: "create/remainingContestants",
    }),
    dspRoster(): Contestant[] {
      return this.$store.state.create.roster;
    },
    pickExists(): boolean {
      return (
        this.$store.state.create.availableContestants.findIndex(
          (option: Contestant) => this.pick === option
        ) !== -1
      );
    },
  },
});
</script>

<style scoped>
.contestantslist__add-contestant {
  margin: 1.25rem 0 2rem;
}

.contestantslist__add-contestant-button {
  font-size: 1rem;
  margin-top: 1rem;
}

.contestantslist__list {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 1rem 0;
}
</style>