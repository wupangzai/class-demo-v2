import { InjectionKey } from "vue";
import {
  createStore,
  CommitOptions,
  useStore as useBaseStore,
  Store as VuexStore,
} from "vuex";
import { State, state } from "./state";
import { Getters, getters } from "./getters";
import { Mutations, mutations } from "./mutations";

type Store = Omit<VuexStore<State>, "getters" | "commit"> & {
  // 改写 Store中的类型，具备ts的类型安全检测
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;

  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

const key: InjectionKey<Store> = Symbol(); // 创建一个具备类型安全的唯一注入 Key，用于在 Vue 组件中注入 Store 实例。

const storeOptions = {
  state: () => state, // 单独定义state是为了让ts验证State类型

  getters,

  mutations,
};

const store = createStore(storeOptions) as Store;

// 定义自己的 `useStore` 组合式函数
function useStore(): Store {
  // 声明 Store 类型，才会有getters提示
  return useBaseStore(key);
}

export { store, key, useStore };
