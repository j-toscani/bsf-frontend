import { Plugin } from "@nuxt/types";
import createBaseRepository from "@/helper/createBaseRepository";

const apiPlugin: Plugin = (context, inject) => {
  const baseRepository = createBaseRepository(context);

  const playerRepository = baseRepository("players");

  const api = {
    players: playerRepository
  };

  inject("api", api);
};

declare module "vue/types/vue" {
  // this.$api inside Vue components
  interface Vue {
    $api(message: string): void;
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api(message: string): void;
  }
  // nuxtContext.$api
  interface Context {
    $api(message: string): void;
  }
}

declare module "vuex/types/index" {
  // this.$api inside Vuex stores
  interface Store<S> {
    $api(message: string): void;
  }
}

export default apiPlugin;
