import { Team } from "@/types/types";

export default function createGame(g_id: string, teams: Team[]) {
  return {
    g_id,
    name_team_a: teams[0].name,
    name_team_b: teams[1].name,
    team_performances: {
      team_a: [],
      team_b: []
    }
  };
}
