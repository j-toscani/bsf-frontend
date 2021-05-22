import { TEAM_OPTIONS, ENDPOINTS } from "@/helper/constants";
import {
  ApiTournament,
  ApiPlayer,
  ApiPerformance,
  ApiGame,
  ApiPerformanceComponentName
} from "@/types/types";

export type TeamSize = typeof TEAM_OPTIONS[number];

const values = TEAM_OPTIONS.map(option => option.value);
export type TeamSizeValue = typeof values[number];

type RessourceTypeMap = {
  players: ApiPlayer;
  tournaments: ApiTournament<ApiPerformanceComponentName | "api">;
  performances: ApiPerformance<ApiPerformanceComponentName | "api">;
  games: ApiGame<ApiPerformanceComponentName | "api">;
};

export type Ressource = typeof ENDPOINTS[number];
export type RessourceType<T extends Ressource> = RessourceTypeMap[T];
