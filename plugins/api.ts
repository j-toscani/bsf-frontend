import { Plugin } from "@nuxt/types";
import createExtendedApi, { Api } from "@/helper/createExtendedApi";
import createBaseRepository from "@/helper/createBaseRepository";
import { Repositories } from "~/helper/createExtendedApi";

const apiPlugin: Plugin = (context, inject) => {
  const baseRepository = createBaseRepository(context);

  let repos: Repositories = {
    players: baseRepository("players"),
    tournaments: baseRepository("tournaments"),
    performances: baseRepository("performances"),
    games: baseRepository("games")
  };

  const api = createExtendedApi(repos, context);

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
