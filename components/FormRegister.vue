<template>
  <form id="register" @submit="handleSubmit">
    <CustomInput type="email" label="Email" v-model="email" />
    <CustomInput type="password" label="Password" v-model="password" />
    <CustomInput
      type="password"
      label="Repeat Password"
      v-model="repeatPassword"
    />
    <CustomButton form="login" type="submit" level="tertiary">
      Register!
    </CustomButton>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import CustomInput from "./CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  components: { CustomButton, CustomInput },
  data() {
    return {
      password: "",
      repeatPassword: "",
      email: "",
    };
  },
  computed: {
    passwordIsValid(): boolean {
      return true;
    },
  },
  methods: {
    handleSubmit() {
      if (!this.passwordIsValid) {
        this.$toast.add("Password is not valid");
        return;
      }
      const payload = {
        password: this.password,
        email: this.email,
      };

      console.log(payload);
    },
  },
});
</script>

<style scoped>
</style>