import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { CONTESTANTS, TEAM_OPTIONS } from "@/helper/constants";
import { Contestant, TeamSize, TeamSizeValue, Team } from "@/types/types";

export const state = () => ({
  roster: [] as Contestant[],

  teams: [] as Team[],
  teamOptions: TEAM_OPTIONS,

  teamSize: 1 as TeamSizeValue,
  availableContestants: CONTESTANTS
});

export type CreateTournamentState = ReturnType<typeof state>;

export const getters: GetterTree<CreateTournamentState, RootState> = {
  hasMinAmmountOfContestants(state) {
    return state.roster.length > 3;
  },
  maxNumberOfTeams(state) {
    return Math.ceil(state.roster.length / state.teamSize);
  }
};

export const mutations: MutationTree<CreateTournamentState> = {
  ADD_TO_ROSTER: (state, contestant: Contestant) =>
    state.roster.push(contestant),
  REMOVE_FROM_ROSTER: (state, index: number) => state.roster.splice(index, 1),
  SET_TEAM_SIZE: (state, size: TeamSizeValue) => (state.teamSize = size),
  SET_TEAMS: (state, teams: Team[]) => (state.teams = teams),
  ADD_TO_TEAM: (state, data: { teamIndex: number; contestant: Contestant }) =>
    state.teams[data.teamIndex].contestants.push(data.contestant),
  SET_TEAM: (state, data: { teamIndex: number; team: Team }) =>
    state.teams.splice(data.teamIndex, 1, data.team)
};

export const actions: ActionTree<CreateTournamentState, RootState> = {
  addToRoster({ commit, dispatch }, contestant) {
    commit("ADD_TO_ROSTER", contestant);
    dispatch("setEmptyTeams");
  },
  deleteFromRoster({ commit, dispatch }, contestantIndex) {
    commit("DELETE_FROM_ROSTER", contestantIndex);
    dispatch("setEmptyTeams");
  },
  setTeamSize({ commit, dispatch }, teamSize) {
    commit("SET_TEAM_SIZE", teamSize);
    dispatch("setEmptyTeams");
    dispatch("handleTeamChange");
  },
  handleTeamChange({ state, dispatch }) {
    state.roster.forEach((contestant: Contestant, index: number) =>
      dispatch("addToTeamByIndex", { contestant, index })
    );
  },
  addToTeamByIndex({ dispatch, getters }, { contestant, index }) {
    const teamIndex = index % getters.maxNumberOfTeams;
    dispatch("addToTeam", { teamIndex, contestant });
  },
  addToTeam({ commit }, data: { teamIndex: number; contestant: Contestant }) {
    commit("ADD_TO_TEAM", data);
  },
  setEmptyTeams({ commit, getters, state }) {
    const teams: Team[] = [];

    for (let index = 0; index < getters.maxNumberOfTeams; index++) {
      teams.push({
        name: state.teams[index]?.name
          ? state.teams[index]?.name
          : "Team " + (index + 1),
        contestants: []
      });
    }
    commit("SET_TEAMS", teams);
  }
};
