import { Plugin } from "@nuxt/types";
import createBaseRepository, {
  Repository
} from "@/helper/createBaseRepository";

export type Api = {
  players: Repository<"players">;
  tournaments: Repository<"tournaments">;
  performances: Repository<"performances">;
  games: Repository<"games">;
};

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
