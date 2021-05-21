import { GetterTree, ActionTree, MutationTree } from "vuex";
import { ApiTournament, CmsResultComponent } from "@/types/types";

export const state = () => ({
  tournaments: [] as ApiTournament[],
  resultTypes: [] as CmsResultComponent[]
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  SET_TOURNAMENTS: (state, tournaments: ApiTournament[]) =>
    (state.tournaments = tournaments)
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchTournaments({ commit }) {
    const tournaments = await this.$api.tournaments.getMany();
    commit("SET_TOURNAMENTS", tournaments);
  },
  async fetchResultTypes({ commit }) {
    const allComponentTypes = this.$api;
  }
};
