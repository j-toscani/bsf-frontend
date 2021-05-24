import { Plugin } from "@nuxt/types";
import { createAuthActions, AuthActions } from "~/helper/createAuthActions";

const authActionsActions: Plugin = (context, inject) => {
  const authActions = createAuthActions(context);
  inject("authActions", authActions);
};

declare module "vue/types/vue" {
  // this.$authActions inside Vue components
  interface Vue {
    $authActions: AuthActions;
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$authActions inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $authActions: AuthActions;
  }
  // nuxtContext.$authActions
  interface Context {
    $authActions: AuthActions;
  }
}

declare module "vuex/types/index" {
  // this.$authActions inside Vuex stores
  interface Store<S> {
    $authActions: AuthActions;
  }
}

export default authActionsActions;
