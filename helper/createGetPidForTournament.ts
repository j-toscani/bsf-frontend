export default function createGetPidForTournament(tournamentName: string) {
  return (playerName: string, nthGame: number) => {
    const uuidElements = [
      playerName,
      tournamentName,
      nthGame.toString()
    ].map(name => transformForUUID(name));
    return uuidElements.join("__");
  };
}

function transformForUUID(string: string) {
  const trimmed = string.trim();
  return trimmed.split(" ").join("_");
}
