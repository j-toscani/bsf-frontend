import { Api } from "~/plugins/api";
import { ApiTournament, Team } from "~/types/types";

import createGetGidForTournament from "./createGetGidForTournament";
import createGetPidForTournament from "./createGetPidForTournament";
import createTournamentPerformance from "./createTournamentPerformance";
import createGame from "@/helper/createGame";

export default function createTournamentMatchupCreator(api: Api) {
  return function createMatchupCreator(tournament: ApiTournament) {
    const getPid = createGetPidForTournament(tournament);
    const getGid = createGetGidForTournament(tournament);
    const createPlayerPerformance = createTournamentPerformance(tournament);

    return async function createMatchup(teams: [Team, Team], matchNr: number) {
      const [teamA, teamB] = teams;
      const g_id = getGid(teamA.name, teamB.name);
      const game = createGame({ g_id, tournamentId: tournament.id }, [
        teamA,
        teamB
      ]);
      const createdGame = await api.games.create(game);
      const players = [...teamA.players, ...teamB.players];

      const performanceRequests = players.map(player => {
        const p_id = getPid(player.gamertag, matchNr);
        const performance = createPlayerPerformance(player, {
          p_id,
          game_id: createdGame.id!
        });
        return api.performances.create(performance);
      });

      const performances = await Promise.all(performanceRequests);
      const performanceIds = performances.map(performance => performance.id!);
      api.games.update(createdGame.id!, { performances: performanceIds });
    };
  };
}
