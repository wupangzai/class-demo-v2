import { computed, ComputedRef } from "vue";
import { useStore } from "@/store";
import { Getters } from "@/store/modules/common/getters";

// 计算每个 getter 返回值对应的 ComputedRef 类型
type ComputedGetters<T extends Record<string, (...args: any) => any>> = {
  [K in keyof T]: ComputedRef<ReturnType<T[K]>>;
};

// 重载1：传入字符串数组，返回 Pick 类型映射
function useCommonGetters<K extends keyof Getters>(
  keys: K[]
): Pick<ComputedGetters<Getters>, K>;

// 重载2：传入别名映射对象，返回对应别名类型
function useCommonGetters<M extends Record<string, keyof Getters>>(
  keys: M
): { [P in keyof M]: ComputedRef<ReturnType<Getters[M[P]]>> };

// 实现
function useCommonGetters(
  keys: Array<keyof Getters> | Record<string, keyof Getters>
) {
  const store = useStore();

  const result: Record<string, ComputedRef<any>> = {};

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key as string] = computed(
        () => store.getters[`commonModule/${key}`]
      );
    });
  } else {
    Object.entries(keys).forEach(([alias, key]) => {
      result[alias] = computed(() => store.getters[`commonModule/${key}`]);
    });
  }

  return result;
}

export default useCommonGetters;
