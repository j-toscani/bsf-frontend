<template>
  <div class="wrapper">
    <form id="resetpw" @submit.prevent="handleSubmit">
      <h1>Set your new Password:</h1>
      <CustomInput type="password" label="Password" v-model="password" />
      <CustomInput
        type="password"
        label="Repeat Password"
        v-model="repeatPassword"
      />
      <CustomButton form="resetpw" type="submit" level="tertiary">
        Submit!
      </CustomButton>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "PwReset",
  data() {
    return {
      password: "",
      repeatPassword: "",
    };
  },
  computed: {
    passwordIsValid() {
      return true;
    },
  },
  methods: {
    handleSubmit() {},
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>