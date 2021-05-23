<template>
  <div class="center-form">
    <form-login class="login-form" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FormLogin from "~/components/FormLogin.vue";

export default Vue.extend({
  components: { FormLogin },
  mounted() {
    console.log(this.$route.path);
  },
});
</script>

<style scoped>
.center-form {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.login-form >>> button {
  width: min-content;
}
</style>
