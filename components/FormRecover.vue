<template>
  <form id="recover" @submit.prevent="handleSubmit">
    <CustomInput type="email" label="Email" v-model="email" />
    <CustomButton form="login" type="submit" level="tertiary">
      Send!
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
      email: "",
    };
  },
  methods: {
    handleSubmit() {
      const payload = {
        email: this.email,
      };

      this.$axios
        .$post("/auth/forgot-password", payload)
        .then(() =>
          this.$toast.add("A password-reset Mail was sent to your inbox!")
        )
        .catch((error) => {
          console.error(error);
          this.$toast.add("Mail was not sent. Something went wrong.");
        });
    },
  },
});
</script>

<style scoped>
</style>