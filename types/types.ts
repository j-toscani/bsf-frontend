interface ApiReference {
  _id: string;
  kind: string;
  ref: string;
}

export type ApiPlayer = {
  discord: boolean;
  telegram: boolean;
  mail: boolean;
  participated_in: ApiTournament[] | string;
  _id: string;
  gamertag: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  performances: ApiPerformance[];
  id: string;
};

export interface ApiTournament {
  teamsize: "one" | "two" | "three";
  _id?: string;
  published_at?: Date;
  date: Date;
  name: string;
  createdAt?: Date;
  updatedAt: Date;
  __v?: number;
  contestants: ApiPlayer[] | string[];
  games: ApiGame[] | String[];
  id?: string;
}

export interface ApiGame {
  _id?: string;
  published_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  tournament: ApiTournament | string;
  teams: {
    team_a: ApiPlayer[] | string[];
    team_b: ApiPlayer[] | string[];
    _id?: string;
    __v?: number;
    id?: string;
  };
  performances: ApiPerformance[] | string[];
  name_team_a: string;
  name_team_b: string;
  g_id: string;
  id?: string;
}

export interface ApiPerformance {
  _id?: string;
  points: {
    _id?: string;
    goals: number;
    points: number;
    assists: number;
    saves: number;
    shots: number;
    __v?: number;
    id?: string;
  };
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

export type PerformancePoints = {
  goals: number;
  points: number;
  assists: number;
  saves: number;
  shots: number;
};
