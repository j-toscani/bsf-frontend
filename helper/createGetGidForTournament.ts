export default function createGetGameUuid(tournamentName: string) {
  (teamNameA: string, teamNameB: string) => {
    const formattedNames = [teamNameA, teamNameB].map(trimAndFormat);
    const [formattedNameA, formattedNameB] = formattedNames;
    return `${tournamentName}__${formattedNameA}_vs_${formattedNameB}`;
  };
}

function trimAndFormat(teamName: string) {
  return teamName
    .trim()
    .split(" ")
    .join("_");
}
