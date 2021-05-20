import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { TEAM_OPTIONS } from "@/helper/constants";
import { ApiPlayer, Team } from "@/types/types";
import { TeamSizeValue } from "@/types/derivedTypes";

export const state = () => ({
  roster: [] as ApiPlayer[],
  name: "" as string,
  date: null as Date | null,

  allowEmptySlots: false as boolean,
  teams: [] as Team[],
  teamOptions: TEAM_OPTIONS,

  teamSize: 1 as TeamSizeValue,
  availablePlayers: [] as ApiPlayer[]
});

export type CreateTournamentState = ReturnType<typeof state>;

export const getters: GetterTree<CreateTournamentState, RootState> = {
  hasMinAmmountOfContestants(state) {
    return state.roster.length > 3;
  },
  numberOfTeams(state) {
    const max = Math.ceil(state.roster.length / state.teamSize);
    const min = Math.floor(state.roster.length / state.teamSize);
    return state.allowEmptySlots ? max : min;
  },
  overflowingContestants(state) {
    const players = state.teams.map(team => team.players.slice(state.teamSize));
    return players.flat();
  },
  remainingContestants(state) {
    return state.availablePlayers.filter(
      (option: ApiPlayer) => !state.roster.includes(option)
    );
  },
  allTeamsAreFilled(state) {
    const contestantInTeams = state.teams.map(team => team?.players?.length);
    return contestantInTeams.length > 0
      ? contestantInTeams.every(element => element >= state.teamSize)
      : false;
  }
};

export const mutations: MutationTree<CreateTournamentState> = {
  SET_DATE: (state, val) => (state.date = val),
  SET_PLAYERS: (state, players) => (state.availablePlayers = players),
  SET_NAME: (state, val) => (state.name = val),
  SET_EMPTY_OPEN_SLOTS: (state, val) => (state.allowEmptySlots = val),
  SET_TEAM_SIZE: (state, size: TeamSizeValue) => (state.teamSize = size),
  SET_TEAMS: (state, teams: Team[]) => (state.teams = teams),
  SET_TEAM: (state, data: { teamIndex: number; team: Team }) =>
    state.teams.splice(data.teamIndex, 1, data.team),
  ADD_TO_ROSTER: (state, contestant: ApiPlayer) =>
    state.roster.push(contestant),
  ADD_TO_TEAM: (state, data: { teamIndex: number; contestant: ApiPlayer }) =>
    state.teams[data.teamIndex].players.push(data.contestant),
  REMOVE_FROM_ROSTER: (state, index: number) => state.roster.splice(index, 1)
};

export const actions: ActionTree<CreateTournamentState, RootState> = {
  setDate({ commit }, date) {
    commit("SET_DATE", date);
  },
  setName({ commit }, name) {
    commit("SET_NAME", name);
  },
  addToRoster({ commit, dispatch, state }, contestantName: string) {
    const contestant = state.availablePlayers.find(
      player => player.gamertag === contestantName
    );

    commit("ADD_TO_ROSTER", contestant);
    dispatch("setEmptyTeams");
  },
  async setPlayers({ commit }) {
    const players = await this.$api.players.getAll();
    commit("SET_PLAYERS", players);
  },
  addToPlayers({ commit }, contestant: ApiPlayer) {
    commit("ADD_TO_PLAYERS", contestant);
  },
  deleteFromRoster({ commit, dispatch }, contestantIndex) {
    commit("REMOVE_FROM_ROSTER", contestantIndex);
    dispatch("setEmptyTeams");
  },
  setTeamSize({ commit, dispatch }, teamSize) {
    commit("SET_TEAM_SIZE", teamSize);
    dispatch("setEmptyTeams");
    dispatch("handleTeamChange");
  },
  handleTeamChange({ state, dispatch }) {
    state.roster.forEach((contestant: ApiPlayer, index: number) =>
      dispatch("addToTeamByIndex", { contestant, index })
    );
  },
  addToTeamByIndex({ dispatch, getters }, { contestant, index }) {
    const teamIndex = index % getters.numberOfTeams;
    dispatch("addToTeam", { teamIndex, contestant });
  },
  toggleTeamCount({ commit, dispatch, state }) {
    commit("SET_EMPTY_OPEN_SLOTS", !state.allowEmptySlots);
    dispatch("setEmptyTeams");
    dispatch("handleTeamChange");
  },
  addToTeam({ commit }, data: { teamIndex: number; contestant: ApiPlayer }) {
    commit("ADD_TO_TEAM", data);
  },
  setEmptyTeams({ commit, getters, state }) {
    const teams: Team[] = [];

    for (let index = 0; index < getters.numberOfTeams; index++) {
      teams.push({
        name: state.teams[index]?.name
          ? state.teams[index]?.name
          : "Team " + (index + 1),
        players: []
      });
    }
    commit("SET_TEAMS", teams);
  }
};
