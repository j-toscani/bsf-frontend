<template>
  <CustomPopup @close="emitClose">
    <FormLogin />
    <FormRecover />
    <FormRegister />
  </CustomPopup>
</template>

<script lang="ts">
import Vue from "vue";

import CustomPopup from "@/components/CustomPopup.vue";
import FormLogin from "@/components/FormLogin.vue";
import FormRecover from "@/components/FormRecover.vue";
import FormRegister from "@/components/FormRegister.vue";

export default Vue.extend({
  components: {
    CustomPopup,

    FormLogin,
    FormRecover,
    FormRegister,
  },
  methods: {
    emitClose() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
</style>