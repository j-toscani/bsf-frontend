import { GetterTree, ActionTree, MutationTree } from "vuex";
import {
  ApiPerformanceComponentName,
  ApiTournament,
  CmsComponent
} from "@/types/types";

export const state = () => ({
  tournaments: [] as ApiTournament<ApiPerformanceComponentName>[],
  resultConfigs: [] as CmsComponent[],
  modalOpen: false as boolean
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {};

export const mutations: MutationTree<RootState> = {
  SET_MODAL_STATE: (state, modalState) => (state.modalOpen = modalState),
  SET_TOURNAMENTS: (
    state,
    tournaments: ApiTournament<ApiPerformanceComponentName>[]
  ) => (state.tournaments = tournaments),
  SET_RESULT_CONFIGS: (state, configs) => (state.resultConfigs = configs)
};

export const actions: ActionTree<RootState, RootState> = {
  setModalState({ commit }, modalState: boolean) {
    commit("SET_MODAL_STATE", modalState);
  },
  async fetchTournaments({ commit }) {
    const tournaments = await this.$api.tournaments.getMany();
    commit("SET_TOURNAMENTS", tournaments);
  },
  async fetchResultConfigs({ commit }) {
    const allComponentConfigs = await this.$api.getCmsComponentConfigs();
    const resultComponentConfigs = allComponentConfigs.data.filter(
      componentConfig => {
        return componentConfig.category.startsWith("results");
      }
    );
    commit("SET_RESULT_CONFIGS", resultComponentConfigs);
  }
};
