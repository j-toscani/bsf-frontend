import { ApiTournament } from "~/types/types";

export default function createGetGidForTournament(tournament: ApiTournament) {
  return (teamNameA: string, teamNameB: string) => {
    const formattedNames = [teamNameA, teamNameB].map(trimAndFormat);
    const [formattedNameA, formattedNameB] = formattedNames;
    return `${tournament.name
      .split(" ")
      .join("_")}__${formattedNameA}_vs_${formattedNameB}`;
  };
}

function trimAndFormat(teamName: string) {
  return teamName
    .trim()
    .split(" ")
    .join("_");
}
