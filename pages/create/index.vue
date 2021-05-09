<template>
  <main>
    <h2>This is the Contestants page.</h2>
    <ul>
      <li v-for="(contestant, index) in roster" :key="index">
        {{ contestant }}
      </li>
      <li>
        <CustomInput
          label="Add Contestant"
          id="pick"
          v-model="pick"
          list="available"
          :options="remainingPicks"
        />
        <button :disabled="!pickExists" @click="handleAddButtonClick">
          Add
        </button>
      </li>
    </ul>

    <form class="form__add-contestants"></form>
    <div>
      <nuxt-link class="form__next-link" to="/create/teams" v-if="valid">
        Next
      </nuxt-link>
      <span class="form__next-link disabled" else> Next </span>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import CustomInput from "@/components/CustomInput.vue";

export default Vue.extend({
  name: "Contestants",
  components: {
    CustomInput,
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

.disabled {
  opacity: 0.75;
}
</style>