import { ApiTournament, PerformancePoints, ApiPlayer } from "@/types/types";

function createRocketLeaguePerformance(
  refs: {
    playerId: string;
    tournamentId: string;
  },
  ids: { p_id: string; game_id: string }
) {
  const { playerId, tournamentId } = refs;
  const { p_id, game_id } = ids;
  const points: PerformancePoints = {
    __component: "results.rocket-league",
    goals: 0,
    points: 0,
    assists: 0,
    saves: 0,
    shots: 0
  };
  return {
    stats: [points],

    player: playerId,
    tournament: tournamentId,
    p_id,
    game: game_id
  };
}

export default function createTournamentPerformance(
  tournament: ApiTournament<"api">
) {
  return (player: ApiPlayer, ids: { p_id: string; game_id: string }) => {
    const refs = { playerId: player.id, tournamentId: tournament.id! };
    return createRocketLeaguePerformance(refs, ids);
  };
}
