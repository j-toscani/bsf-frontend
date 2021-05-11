import { TEAM_OPTIONS, CONTESTANTS } from "@/helper/constants";

export type Contestant = typeof CONTESTANTS[number];
export interface Team {
  name: string;
  contestants: Contestant[];
}

export type TeamSize = typeof TEAM_OPTIONS[number];

const values = TEAM_OPTIONS.map(option => option.value);
export type TeamSizeValue = typeof values[number];
