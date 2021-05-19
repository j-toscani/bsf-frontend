import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { TEAM_OPTIONS } from "@/helper/constants";
import { Player, Team } from "@/types/types";
import { TeamSizeValue } from "@/types/derivedTypes";

export const state = () => ({
  roster: [] as Player[],
  name: "" as string,
  date: null as Date | null,

  allowEmptySlots: false as boolean,
  teams: [] as Team[],
  teamOptions: TEAM_OPTIONS,

  teamSize: 1 as TeamSizeValue,
  availableContestants: [] as Player[]
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
    const contestants = state.teams.map(team =>
      team.contestants.slice(state.teamSize)
    );
    return contestants.flat();
  },
  remainingContestants(state) {
    return state.availableContestants.filter(
      (option: Player) => !state.roster.includes(option)
    );
  },
  allTeamsAreFilled(state) {
    const contestantInTeams = state.teams.map(
      team => team?.contestants?.length
    );
    return contestantInTeams.length > 0
      ? contestantInTeams.every(element => element >= state.teamSize)
      : false;
  }
};

export const mutations: MutationTree<CreateTournamentState> = {
  SET_DATE: (state, val) => (state.date = val),
  SET_CONTESTANTS: (state, contestants) =>
    (state.availableContestants = contestants),
  SET_NAME: (state, val) => (state.name = val),
  SET_EMPTY_OPEN_SLOTS: (state, val) => (state.allowEmptySlots = val),
  SET_TEAM_SIZE: (state, size: TeamSizeValue) => (state.teamSize = size),
  SET_TEAMS: (state, teams: Team[]) => (state.teams = teams),
  SET_TEAM: (state, data: { teamIndex: number; team: Team }) =>
    state.teams.splice(data.teamIndex, 1, data.team),
  ADD_TO_ROSTER: (state, contestant: Player) => state.roster.push(contestant),
  ADD_TO_TEAM: (state, data: { teamIndex: number; contestant: Player }) =>
    state.teams[data.teamIndex].contestants.push(data.contestant),
  REMOVE_FROM_ROSTER: (state, index: number) => state.roster.splice(index, 1)
};

export const actions: ActionTree<CreateTournamentState, RootState> = {
  setDate({ commit }, date) {
    commit("SET_DATE", date);
  },
  setName({ commit }, name) {
    commit("SET_NAME", name);
  },
  addToRoster({ commit, dispatch }, contestant) {
    commit("ADD_TO_ROSTER", contestant);
    dispatch("setEmptyTeams");
  },
  setContestants() {},
  addToContestants({ commit }, contestant: Player) {
    commit("ADD_TO_CONTESTANTS", contestant);
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
    state.roster.forEach((contestant: Player, index: number) =>
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
  addToTeam({ commit }, data: { teamIndex: number; contestant: Player }) {
    commit("ADD_TO_TEAM", data);
  },
  setEmptyTeams({ commit, getters, state }) {
    const teams: Team[] = [];

    for (let index = 0; index < getters.numberOfTeams; index++) {
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
