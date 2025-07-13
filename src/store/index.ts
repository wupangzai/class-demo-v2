import {
  createStore,
  Store as VuexStore,
  useStore as useBaseStore,
} from "vuex";
import { InjectionKey } from "vue";

import commonModule from "./modules/common";

import { RootState, EnhancedStore } from "./types/root";

const key: InjectionKey<VuexStore<RootState>> = Symbol(); // 创建一个具备类型安全的唯一注入 Key，用于在 Vue 组件中注入 Store 实例。

const rootState = {
  version: "v2.0.0",
} as RootState;

const store = createStore({
  state: () => rootState,

  mutations: {
    fn(state, payload: number) {
      return payload;
    },
  },

  modules: {
    commonModule,
  },
}) as EnhancedStore;

function useStore(): EnhancedStore {
  return useBaseStore(key);
}

export { store, key, useStore };
