import { ApiTournament } from "~/types/types";

export default function createGetPidForTournament(tournament: ApiTournament) {
  return (playerName: string, nthGame: number) => {
    const uuidElements = [
      playerName,
      tournament.name,
      nthGame.toString()
    ].map(name => transformForUUID(name));
    return uuidElements.join("__");
  };
}

function transformForUUID(string: string) {
  const trimmed = string.trim();
  return trimmed.split(" ").join("_");
}
