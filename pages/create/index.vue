<template>
  <section>
    <form @submit.prevent="handleSubmit" id="createTournament">
      <CustomInput label="Starts:" type="date" v-model="date" />
      <CustomInput label="Tournamentname:" type="text" v-model="name" />
    </form>
    <nav>
      <nuxt-link class="form__next-link" to="/create/teams" v-if="valid">
        Next
      </nuxt-link>
      <span class="form__next-link disabled" v-else> Next </span>
    </nav>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  components: {
    CustomButton,
    CustomInput,
  },
  data(): {
    date: Date | null;
    name: string;
  } {
    return {
      date: null,
      name: "",
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.name, this.date);
    },
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>