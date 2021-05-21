import { ApiPerformanceComponentName, ApiTournament } from "~/types/types";

export default function createGetGidForTournament(
  tournament: ApiTournament<ApiPerformanceComponentName>
) {
  return (teamNameA: string, teamNameB: string) => {
    const formattedNames = [teamNameA, teamNameB].map(trimAndFormat);
    const [formattedNameA, formattedNameB] = formattedNames;
    return `${formattedNameA}_vs_${formattedNameB}__${tournament.name
      .split(" ")
      .join("_")}`;
  };
}

function trimAndFormat(teamName: string) {
  return teamName
    .trim()
    .split(" ")
    .join("_");
}
