<template>
  <main>
    <h2>This is the Contestants page.</h2>

    <form
      class="contestantslist__add-contestant"
      @submit.prevent="addToRoster"
      id="addContestant"
    >
      <CustomInput
        label="Add Contestant"
        id="pick"
        v-model="pick"
        list="available"
        :options="remainingPicks"
      />
      <CustomButton
        :disabled="!pickExists"
        level="tertiary"
        form="addContestant"
        class="contestantslist__add-contestant-button"
      >
        +
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
    <nav class="">
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

import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  name: "Contestants",
  components: {
    CustomInput,
    CustomButton,
  },
  data(): {
    pick: string;
  } {
    return {
      pick: "",
    };
  },
  methods: {
    addToRoster() {
      this.$store.dispatch("create/addToRoster", this.pick);
      this.pick = "";
    },
    deleteFromRoster(index: number) {
      this.$store.dispatch("create/deleteFromRoster", index);
    },
  },
  computed: {
    ...mapGetters({
      valid: "create/hasMinAmmountOfContestants",
    }),
    dspRoster(): Contestant[] {
      return this.$store.state.create.roster;
    },
    remainingPicks(): Contestant[] {
      return this.$store.state.create.availableContestants.filter(
        (option: Contestant) => !this.dspRoster.includes(option)
      );
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
.form__next-link {
  border: 1px solid var(--color-200);
  background: var(--color-200);
  color: white;

  padding: 0.5rem 1rem;
  display: inline-block;
  border-radius: 0.25rem;
}

button:disabled,
.disabled {
  opacity: 0.5;
}

.contestantslist__add-contestant {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.25rem 0 2rem;
}

.contestantslist__add-contestant-button {
  font-size: 1rem;
}

.contestantslist__list {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin: 2rem 0;
}
</style>