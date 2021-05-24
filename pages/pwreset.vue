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
import { PasswordResetPayload } from "~/helper/createAuthActions";

export default Vue.extend({
  name: "PwReset",
  asyncData() {
    const { confirmation } = this.$route.query;
    return {
      code: confirmation,
    };
  },
  data(): PasswordResetPayload {
    return {
      password: "",
      code: "",
      passwordConfirmation: "",
    };
  },
  computed: {
    payload(): PasswordResetPayload {
      return {
        code: this.code,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      };
    },
    passwordIsValid() {
      return true;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.code) {
        return;
      }

      this.$authActions
        .resetPassword(this.payload)
        .then(() => this.$toast.add("Successs!"))
        .catch(() => this.$toast.add("Failure!"));
    },
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