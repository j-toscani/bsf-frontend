type PerformancePoints = {
  goals: number;
  points: number;
  assists: number;
  saves: number;
  shots: number;
};

class PlayerPerformance {
  player: string;
  tournament: string;
  points: PerformancePoints;

  constructor(
    refs: { playerId: string; tournamentId: string },
    points: PerformancePoints
  ) {
    const { playerId, tournamentId } = refs;
    this.player = playerId;
    this.tournament = tournamentId;
    this.points = points;
  }
}

export default function createTournamentPerformance(tournamentId: string) {
  return (playerId: string, points: PerformancePoints) => {
    const refs = { playerId, tournamentId };
    return new PlayerPerformance(refs, points);
  };
}
