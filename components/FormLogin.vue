<template>
  <form id="login" @submit.prevent="handleSubmit">
    <CustomInput type="email" label="Email" v-model="email" />
    <CustomInput type="password" label="Password" v-model="password" />
    <CustomButton form="login" type="submit" level="tertiary">
      Login!
    </CustomButton>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import CustomInput from "./CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  components: { CustomInput, CustomButton },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      const payload = { identifier: this.email, password: this.password };
      this.$auth
        .loginWith("local", { data: payload })
        .then(() => this.handleLoginSuccess())
        .catch(() => this.handleLoginFail());
    },
    handleLoginSuccess() {
      this.$store.dispatch("setModalState", false);
    },
    handleLoginFail() {
      this.$toast.add("Login was not successfull.");
    },
  },
});
</script>

<style scoped>
</style>