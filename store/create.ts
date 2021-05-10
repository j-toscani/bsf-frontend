import { GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "~/store";

import { Contestant } from "@/types/types";

export const state = () => ({
  roster: [] as Contestant[],
  availableContestants: ["Mike", "Flo", "Armin", "Julian P.", "Julian T."]
});

export type CreateTournamentState = ReturnType<typeof state>;

export const getters: GetterTree<CreateTournamentState, RootState> = {
  hasMinAmmountOfContestants(state) {
    return state.roster.length > 3;
  }
};

export const mutations: MutationTree<CreateTournamentState> = {
  ADD_TO_ROSTER: (state, contestant: Contestant) =>
    state.roster.push(contestant),
  REMOVE_FROM_ROSTER: (state, index: number) => state.roster.splice(index, 1)
};

export const actions: ActionTree<CreateTournamentState, RootState> = {
  addToRoster({ commit }, contestant) {
    commit("ADD_TO_ROSTER", contestant);
  },
  deleteFromRoster({ commit }, contestantIndex) {
    commit("DELETE_FROM_ROSTER", contestantIndex);
  }
};
