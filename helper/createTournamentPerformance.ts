import { ApiTournament, PerformancePoints, ApiPlayer } from "@/types/types";
import createGetPidForTournament from "./createGetPidForTournament";

function createPlayerPerformance(
  refs: {
    playerId: string;
    tournamentId: string;
  },
  ids: { p_id: string; g_id: string }
) {
  const { playerId, tournamentId } = refs;
  const { p_id, g_id } = ids;
  const points: PerformancePoints = {
    goals: 0,
    points: 0,
    assists: 0,
    saves: 0,
    shots: 0
  };
  return {
    points: points,
    player: playerId,
    tournament: tournamentId,
    p_id,
    g_id
  };
}

export default function createTournamentPerformance(tournament: ApiTournament) {
  return (player: ApiPlayer, ids: { p_id: string; g_id: string }) => {
    const refs = { playerId: player.id, tournamentId: tournament.id };
    return createPlayerPerformance(refs, ids);
  };
}
