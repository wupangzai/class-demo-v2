import { computed, ComputedRef } from "vue";
import { useStore } from "@/store";
import { State } from "@/store/modules/common/state";

// 1. 映射 State 中的每个 key 为 ComputedRef
type ComputedState<T> = {
  [K in keyof T]: ComputedRef<T[K]>;
};

// 2. 重载：传字符串数组 → Pick
function useCommonState<K extends keyof State>(
  keys: K[]
): Pick<ComputedState<State>, K>;

// 3. 重载：传别名映射 → 自定义键名
function useCommonState<M extends Record<string, keyof State>>(
  keys: M
): { [P in keyof M]: ComputedRef<State[M[P]]> };

// 4. 实现
function useCommonState(keys: (keyof State)[] | Record<string, keyof State>) {
  const store = useStore();

  const result: Record<string, ComputedRef<any>> = {};

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key as string] = computed(() => store.state.commonModule[key]);
    });
  } else {
    Object.entries(keys).forEach(([alias, key]) => {
      result[alias] = computed(() => store.state.commonModule[key]);
    });
  }

  return result;
}

export default useCommonState;
