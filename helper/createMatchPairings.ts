import { Team } from "@/types/types";

export default function createMatchPairings(teams: Team[]) {
  const matchups = [];

  for (let index = 0; index < teams.length - 1; index++) {
    const teamToPairWith = teams[index];
    const otherTeams = getAllOtherTeams(teams, index + 1);

    matchups.push(...pairWithAllOtherTeams(teamToPairWith, otherTeams));
  }

  return matchups;
}

function pairWithAllOtherTeams(team: Team, allOtherTeams: Team[]) {
  return allOtherTeams.map(oneOtherTeam =>
    createMatchTouple(team, oneOtherTeam)
  );
}

function getAllOtherTeams(teams: Team[], start: number) {
  return teams.slice(start);
}

function createMatchTouple(teamA: Team, teamB: Team) {
  return [teamA, teamB];
}
