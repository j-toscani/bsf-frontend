<template>
  <main>
    <h2>This is the Contestants page.</h2>

    <form
      class="contestantslist__add-contestant"
      @submit.prevent="handleAddButtonClick"
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
        v-for="(contestant, index) in roster"
        :key="index"
      >
        <CustomButton
          @click="handleDeleteClick(index)"
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
    roster: string[];
    options: string[];
  } {
    return {
      pick: "",
      roster: [],
      options: ["Mike", "Flo", "Armin", "Julian P.", "Julian T."],
    };
  },
  methods: {
    addToRoster() {
      this.roster.push(this.pick);
    },
    handleAddButtonClick() {
      this.addToRoster();
      this.pick = "";
    },
    handleDeleteClick(index: number) {
      this.roster.splice(index, 1);
    },
  },
  computed: {
    remainingPicks(): string[] {
      return this.options.filter((option) => !this.roster.includes(option));
    },
    pickExists(): boolean {
      return this.options.findIndex((option) => this.pick === option) !== -1;
    },
    valid(): boolean {
      return this.roster.length > 3;
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
  opacity: 0.75;
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