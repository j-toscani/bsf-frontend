<template>
  <CustomPopup @close="emitClose">
    <transition name="fade" mode="out-in">
      <FormLogin class="popup-form" v-if="activeMode === 'login'" />
      <FormRecover class="popup-form" v-else-if="activeMode === 'recover'" />
      <FormRegister class="popup-form" v-else />
    </transition>
    <div class="button-container">
      <CustomButton
        class="mode-button"
        type="button"
        level="secondary"
        v-for="(mode, index) of modes"
        :key="index"
        :disabled="activeMode === mode"
        @click="activeMode = mode"
      >
        {{ mode }}
      </CustomButton>
    </div>
  </CustomPopup>
</template>

<script lang="ts">
import Vue from "vue";

import CustomPopup from "@/components/CustomPopup.vue";
import FormLogin from "@/components/FormLogin.vue";
import FormRecover from "@/components/FormRecover.vue";
import FormRegister from "@/components/FormRegister.vue";
import CustomButton from "@/components/CustomButton.vue";

export default Vue.extend({
  components: {
    CustomPopup,

    FormLogin,
    FormRecover,
    FormRegister,
    CustomButton,
  },
  data() {
    return {
      activeMode: "login",
      modes: ["login", "register", "recover"],
    };
  },
  methods: {
    emitClose() {
      this.$emit("close");
    },
  },
});
</script>

<style scoped>
.popup-form {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.mode-button {
  text-transform: capitalize;
}

.popup-form button {
  width: min-content;
}

.button-container {
  display: flex;
  gap: 1rem;
}
</style>