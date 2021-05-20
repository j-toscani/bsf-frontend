import { Api, Repositories } from "~/plugins/api";
import { ApiTournament, Team, ApiGame } from "~/types/types";

import createGetGidForTournament from "./createGetGidForTournament";
import createGetPidForTournament from "./createGetPidForTournament";
import createTournamentPerformance from "./createTournamentPerformance";
import createGame from "@/helper/createGame";

export type TrounamentMatchupCreator = ReturnType<
  typeof createTournamentMatchupCreator
>;

export default function addTournamentMatchupCreator(
  repositories: Repositories
): Api {
  const tournamentMatchupCreator = createTournamentMatchupCreator(repositories);
  return {
    ...repositories,
    tournamentMatchupCreator: tournamentMatchupCreator
  };
}

function createTournamentMatchupCreator(api: Repositories) {
  return function createMatchupCreator(tournament: ApiTournament) {
    if (!tournament.id) {
      console.error("No tournamentId found!");
      return;
    }

    // ToDo: Fix typeinterference problem with tournamentId and gameid!
    const getPid = createGetPidForTournament(tournament);
    const getGid = createGetGidForTournament(tournament);
    const createPlayerPerformance = createTournamentPerformance(tournament);

    const tournamentId = tournament.id!;

    return async function createMatchup(teams: [Team, Team], matchNr: number) {
      const [teamA, teamB] = teams;
      const g_id = getGid(teamA.name, teamB.name);
      const game = createGame({ g_id, tournamentId }, [teamA, teamB]);

      let createdGame = null as null | ApiGame;

      try {
        createdGame = await api.games.create(game);
      } catch (error) {
        console.error(error);
      }

      if (!createdGame) {
        return;
      }

      const gameId = createdGame.id!;
      const players = [...teamA.players, ...teamB.players];

      const performanceRequests = players.map(player => {
        const p_id = getPid(player.gamertag, matchNr);
        const performance = createPlayerPerformance(player, {
          p_id,
          game_id: gameId
        });
        return api.performances.create(performance);
      });

      const performances = await Promise.all(performanceRequests);
      const performanceIds = performances.map(performance => performance.id!);
      return api.games.update(gameId, { performances: performanceIds });
    };
  };
}
