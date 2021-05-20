interface ApiReference {
  _id: string;
  kind: string;
  ref: string;
}

export type ApiPlayer = {
  discord: boolean;
  telegram: boolean;
  mail: boolean;
  participated_in: ApiTournament[];
  _id: string;
  gamertag: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  performances: ApiPerformance[];
  id: string;
};

export interface ApiTournament {
  _id: string;
  teamsize: string;
  published_at: Date;
  date: Date;
  name: string;
  matches?: ApiReference[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  games: [];
  id: string;
}

export interface ApiGame {
  _id: string;
  name: string;
  name_team_one?: string; // old
  name_team_two?: string; // old
  published_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
  tournament: ApiTournament;
  team_performances: {
    team_a: ApiPerformance[];
    team_b: ApiPerformance[];
    _id: string;
    __v: number;
    id: string;
  };
  name_team_a: string;
  name_team_b: string;
  g_id: string;
  id: string;
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
  player: {
    discord: boolean;
    telegram: boolean;
    mail: boolean;
    participated_in: string[];
    _id?: string;
    gamertag: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    id?: string;
  };
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
