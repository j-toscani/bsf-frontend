import { Plugin } from "@nuxt/types";
import { Ressource } from "@/types/derivedTypes";
import createBaseRepository, {
  BaseRepository
} from "@/helper/createBaseRepository";
import addTournamentMatchupCreator, {
  TrounamentMatchupCreator
} from "~/helper/createTournamentMatchupCreator";

export type Repositories = {
  [T in Ressource]: BaseRepository<T>;
};

export interface Api extends Repositories {
  tournamentMatchupCreator: TrounamentMatchupCreator;
}

const apiPlugin: Plugin = (context, inject) => {
  const baseRepository = createBaseRepository(context);

  let repos: Repositories = {
    players: baseRepository("players"),
    tournaments: baseRepository("tournaments"),
    performances: baseRepository("performances"),
    games: baseRepository("games")
  };

  const api = addTournamentMatchupCreator(repos);

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
