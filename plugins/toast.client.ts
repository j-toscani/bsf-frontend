import Vue from "vue";
import toast from "@/helper/Toast";

declare module "vue/types/vue" {
  interface Vue {
    $toast: typeof toast;
  }
}

Vue.prototype.$toast = toast;
