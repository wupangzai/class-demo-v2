import {
  createStore,
  Store as VuexStore,
  useStore as useBaseStore,
} from "vuex";
import { InjectionKey } from "vue";

import commonModule from "./modules/common";

import { RootState, EnhancedStore, MutationsInRoot } from "./types/root";

const key: InjectionKey<VuexStore<RootState>> = Symbol(); // 创建一个具备类型安全的唯一注入 Key，用于在 Vue 组件中注入 Store 实例。

const rootState = {
  version: "v2.0.0",
} as RootState;

const mutationsInRoot: MutationsInRoot = {
  fn(state, payload) {
    console.log("[ state ] >", state, payload);
  },
};

const store = createStore({
  state: () => rootState,

  mutations: mutationsInRoot, // TEST

  modules: {
    commonModule,
  },
}) as EnhancedStore;

function useStore(): EnhancedStore {
  return useBaseStore(key);
}

export { store, key, useStore };
