import { Module } from "vuex";
import { State, state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { RootState } from "@/store/types/root";

const commonModule: Module<State, RootState> = {
  namespaced: true,

  state: () => state, // 单独定义state是为了让ts验证State类型

  getters,

  mutations,

  actions,
};

export default commonModule;
