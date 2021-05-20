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
    name_team_a: teamA.name,
    name_team_b: teamB.name,
    teams: {
      team_a: teamA.players.map(player => player.id),
      team_b: teamB.players.map(player => player.id)
    },
    performances: []
  };
}
