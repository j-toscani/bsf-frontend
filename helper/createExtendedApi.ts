import { Context } from "@nuxt/types";
import { Ressource } from "~/types/derivedTypes";
import { CmsResultComponent } from "~/types/types";
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
  getCmsResultComponentConfigs: (
    context: Context
  ) => Promise<CmsResultComponent[]>;
}

export default function createExtendedApi(
  repositories: Repositories,
  context: Context
): Api {
  const tournamentMatchupCreator = createTournamentMatchupCreator(repositories);
  const getCmsResultComponentConfigs = () => {
    return context.$axios.$get("/content-manager/components");
  };

  return {
    ...repositories,
    tournamentMatchupCreator,
    getCmsResultComponentConfigs
  };
}
