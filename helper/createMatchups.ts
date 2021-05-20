import { Api } from "~/plugins/api";
import { ApiTournament, Team } from "~/types/types";

import createGetGidForTournament from "./createGetGidForTournament";
import createGetPidForTournament from "./createGetPidForTournament";
import createTournamentPerformance from "./createTournamentPerformance";
import createGame from "@/helper/createGame";

type PerformanceCreator = ReturnType<typeof createTournamentPerformance>;

function createMatchupCreator(api: Api) {
  return (tournament: ApiTournament) => {
    const getPid = createGetPidForTournament(tournament);
    const getGid = createGetGidForTournament(tournament);
    const createPlayerPerformance = createTournamentPerformance(tournament);

    return async function createMatchup(teamA: Team, teamB: Team) {
      const g_id = getGid(teamA.name, teamB.name);
      const game = createGame(g_id, [teamA, teamB]);
      const result = await api.games.create(game);
    };
  };
}
