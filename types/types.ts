export type ApiPlayer = {
  discord: boolean;
  telegram: boolean;
  mail: boolean;
  participated_in: ApiTournament<ApiPerformanceComponentName>[] | string;
  _id: string;
  gamertag: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  performances: ApiPerformance<ApiPerformanceComponentName>[];
  id: string;
};

export interface ApiTournament<T extends ApiPerformanceComponentName | "api"> {
  teamsize: "one" | "two" | "three";
  _id?: string;
  published_at?: Date;
  date: Date;
  name: string;
  createdAt?: Date;
  updatedAt: Date;
  __v?: number;
  contestants: T extends "api" ? string[] : ApiPlayer[];
  games: T extends ApiPerformanceComponentName ? ApiGame<T>[] : string[];
  id?: string;
}

export interface ApiGame<T extends ApiPerformanceComponentName | "api"> {
  _id?: string;
  published_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  tournament: ApiTournament<T> | string;
  teams: {
    team_a: ApiPlayer[] | string[];
    team_b: ApiPlayer[] | string[];
    _id?: string;
    __v?: number;
    id?: string;
  };
  performances: T extends "api" ? string[] : ApiPerformance<T>[];
  name_team_a: string;
  name_team_b: string;
  g_id: string;
  id?: string;
}

export interface ApiPerformance<T extends ApiPerformanceComponentName | "api"> {
  _id?: string;
  stats: T extends ApiPerformanceComponentName
    ? [PerformanceTypeMap[T]]
    : [any];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: 1;
  player: ApiPlayer | string;
  p_id: string;
  game: string;
  id?: string;
}

export interface Team {
  name: string;
  players: ApiPlayer[];
}

export type ApiPerformanceComponentName = "results.rocket-league";

interface ApiPerformanceStatistic<T extends ApiPerformanceComponentName> {
  __component: T;
  _id?: string;
  __v?: 0;
  id?: string;
}

export interface PerformancePoints
  extends ApiPerformanceStatistic<"results.rocket-league"> {
  goals: number;
  points: number;
  assists: number;
  saves: number;
  shots: number;
}

export type PerformanceTypeMap = {
  "results.rocket-league": PerformancePoints;
};

export interface CmsComponent {
  uid: string;
  isDisplayed: boolean;
  apiID: string;
  category: string;
  info: {
    name: string;
    icon: string;
    description: string;
    label: string;
  };
  options: {
    timestamps: boolean;
  };
  attributes: {
    [key: string]: {
      type: CmsComponentAttribute;
    };
  };
}

type CmsComponentAttribute =
  | "string"
  | "text"
  | "richtext"
  | "email"
  | "password"
  | "integer"
  | "biginteger"
  | "float"
  | "decimal"
  | "date"
  | "time"
  | "datetime"
  | "boolean"
  | "enumeration"
  | "json"
  | "uid";

export type CmsComponentResponse = {
  data: CmsComponent[];
};
