import { TEAM_OPTIONS, ENDPOINTS } from "@/helper/constants";
import { Tournament, Player, Performance } from "@/types/types";

export type TeamSize = typeof TEAM_OPTIONS[number];

const values = TEAM_OPTIONS.map(option => option.value);
export type TeamSizeValue = typeof values[number];

type RessourceTypeMap = {
  players: Player;
  tournaments: Tournament;
  performances: Performance;
  games: any;
};

export type Ressource = typeof ENDPOINTS[number];
export type RessourceType<T extends Ressource> = RessourceTypeMap[T];
