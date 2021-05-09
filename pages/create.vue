<template>
  <main>
    <h1>Create your Tournament</h1>
    <div>
      <nav>
        <nuxt-link to="/create/"> Contestants </nuxt-link>
        <nuxt-link to="/create/teams"> Teams </nuxt-link>
      </nav>
    </div>
    <nuxt-child />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Create",
});
</script>

<style>
</style>