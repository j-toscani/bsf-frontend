<template>
  <form id="register" @submit.prevent="handleSubmit">
    <CustomInput type="text" label="Username" v-model="name" />
    <CustomInput type="email" label="Email" v-model="email" />
    <CustomInput type="password" label="Password" v-model="password" />
    <CustomInput
      type="password"
      label="Repeat Password"
      v-model="repeatPassword"
    />
    <CustomButton form="register" type="submit" level="tertiary">
      Register!
    </CustomButton>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import CustomInput from "./CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

type RegistrationPayload = {
  email: string;
  username: string;
  password: string;
};

export default Vue.extend({
  components: { CustomButton, CustomInput },
  data() {
    return {
      password: "",
      repeatPassword: "",
      email: "",
      name: "",
    };
  },
  computed: {
    passwordIsValid(): boolean {
      return true;
    },
    payload(): RegistrationPayload {
      return {
        username: this.name,
        password: this.password,
        email: this.email,
      };
    },
  },
  methods: {
    handleSubmit() {
      if (!this.passwordIsValid) {
        this.$toast.add("Password is not valid.");
        return;
      }

      this.handleRegistration(this.payload);
    },
    handleRegistration(payload: RegistrationPayload) {
      this.$axios
        .$post("/auth/local/register", payload)
        .then(() => this.handleRegistrationSuccess())
        .catch(() => this.handleRegistrationFail());
    },
    handleRegistrationFail() {
      this.$toast.add("An Error occuured...");
    },
    handleRegistrationSuccess() {
      this.$toast.add(
        "Registration successfull! Please confirm your email adress."
      );
      // this.$auth.loginWith("local", {
      //   data: { identifier: payload.email, password: payload.password },
      // });
    },
  },
});
</script>

<style scoped>
</style>