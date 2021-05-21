import { Context } from "@nuxt/types";
import { Ressource } from "~/types/derivedTypes";
import { CmsComponent, CmsComponentResponse } from "~/types/types";
import { BaseRepository } from "./createBaseRepository";
import {
  createTournamentMatchupCreator,
  TournamentMatchupCreator
} from "./createTournamentMatchupCreator";

export type Repositories = {
  [T in Ressource]: BaseRepository<T>;
};

export interface Api extends Repositories {
  tournamentMatchupCreator: TournamentMatchupCreator;
  getCmsComponentConfigs: () => Promise<CmsComponentResponse>;
}

export default function createExtendedApi(
  repositories: Repositories,
  context: Context
): Api {
  const tournamentMatchupCreator = createTournamentMatchupCreator(repositories);
  const getCmsComponentConfigs = createGetCmsComponentConfig(context);

  return {
    ...repositories,
    tournamentMatchupCreator,
    getCmsComponentConfigs
  };
}

function createGetCmsComponentConfig(context: Context) {
  return () => {
    return context.$axios.$get("/content-manager/components");
  };
}
