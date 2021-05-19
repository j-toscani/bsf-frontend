<template>
  <section>
    <div class="inputs__container">
      <CustomInput label="Starts:" type="date" v-model="date" />
      <CustomInput label="Tournamentname:" type="text" v-model="name" />
    </div>
    <nav>
      <nuxt-link class="form__next-link" to="/create/players" v-if="valid">
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
  computed: {
    valid(): boolean {
      return this.name.length > 5 && this.date !== null;
    },
  },
  methods: {
    handleSubmit() {
      console.log(this.name, this.date);
    },
  },
  beforeDestroy() {
    this.$store.dispatch("create/setName", this.name);
    this.$store.dispatch("create/setDate", this.date);
  },
});
</script>

<style scoped>
.inputs__container {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>