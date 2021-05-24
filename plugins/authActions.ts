import { Plugin } from "@nuxt/types";

const authActionsActions: Plugin = (context, inject) => {
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
