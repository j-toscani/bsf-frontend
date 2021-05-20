import { Plugin } from "@nuxt/types";
import { Ressource } from "@/types/derivedTypes";
import createBaseRepository, {
  Repository
} from "@/helper/createBaseRepository";

export type Api = {
  [T in Ressource]: Repository<T>;
};

const apiPlugin: Plugin = (context, inject) => {
  const baseRepository = createBaseRepository(context);

  const api: Api = {
    players: baseRepository("players"),
    tournaments: baseRepository("tournaments"),
    performances: baseRepository("performances"),
    games: baseRepository("games")
  };
  inject("api", api);
};

declare module "vue/types/vue" {
  // this.$api inside Vue components
  interface Vue {
    $api: Api;
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$api inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $api: Api;
  }
  // nuxtContext.$api
  interface Context {
    $api: Api;
  }
}

declare module "vuex/types/index" {
  // this.$api inside Vuex stores
  interface Store<S> {
    $api: Api;
  }
}

export default apiPlugin;
