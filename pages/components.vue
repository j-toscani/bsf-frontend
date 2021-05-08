<template>
  <div class="container components-container">
    <CustomCheckbox label="Ceckbox 1" id="firstbox" :value="true" />
    <CustomCheckbox label="Ceckbox 2" id="secondbox" :value="false" />
    <CustomSelect label="Players:" :options="players" />
    <CustomInput type="password" label="Pasword" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CustomCheckbox from "@/components/CustomCheckbox.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomInput from "@/components/CustomInput.vue";

export default Vue.extend({
  name: "components",
  components: {
    CustomCheckbox,
    CustomSelect,
    CustomInput,
  },
  data() {
    return {
      players: ["Mike", "Flo", "Julian", "Armin"],
    };
  },
});
</script>
