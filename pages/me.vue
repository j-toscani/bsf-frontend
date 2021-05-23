<template>
  <div>
    <h1>This is your Page!</h1>
    <ul>
      <li
        class="profile-information"
        v-for="([key, value], index) in informationTuples"
        :key="index"
      >
        <strong class="profile-information-label">{{ key }}</strong>
        <span>{{ value }}</span>
      </li>
    </ul>
    <CustomButton @click="handleLogout">Log me out.</CustomButton>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CustomButton from "~/components/CustomButton.vue";

export default Vue.extend({
  components: { CustomButton },
  middleware: ["auth"],
  computed: {
    profileInformation(): { [key: string]: any } {
      const user = this.$auth.user;
      return user ? this.reduceToUserData(user) : {};
    },
    informationTuples(): [string, unknown][] {
      return Object.entries(this.profileInformation);
    },
  },
  methods: {
    handleLogout() {
      this.$auth.logout();
    },
    formatDate(val: string) {
      const formatter = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });
      return formatter.format(new Date(val));
    },
    reduceToUserData(user: Record<string, unknown>) {
      return {
        username: user.username,
        "e-mail": user.email,
        joined: this.formatDate(user.createdAt as string),
      };
    },
  },
});
</script>

<style scoped>
.profile-information {
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-bottom: 1rem;
  gap: 1rem;
}

.profile-information-label {
  text-transform: capitalize;
}

.profile-information-label::after {
  content: ":";
}
</style>