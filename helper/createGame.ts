import { Team } from "@/types/types";

export default function createGame(
  refs: { g_id: string; tournamentId: string },
  teams: Team[]
) {
  const { g_id, tournamentId } = refs;
  const [teamA, teamB] = teams;
  return {
    g_id,
    tournament: tournamentId,
    teams,
    performances: []
  };
}
