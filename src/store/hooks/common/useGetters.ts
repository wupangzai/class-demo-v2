import { computed, ComputedRef } from "vue";
import { useStore } from "@/store";
import { RootGetters } from "@/store/types/types-helper";

// ✅ 将 getter 类型映射为 ComputedRef<T>
type GetterMapper<T extends Record<string, any>> = {
  [K in keyof T]: ComputedRef<T[K]>;
};

// ========== 重载定义 ==========

// 方式 1：传数组（返回 Pick 工具函数）
function useGetters<K extends keyof RootGetters>(
  keys: K[]
): Pick<GetterMapper<RootGetters>, K>;

// 方式 2：传别名映射（返回别名类型）
function useGetters<M extends Record<string, keyof RootGetters>>(
  keys: M
): { [K in keyof M]: ComputedRef<RootGetters[M[K]]> };

// ========== 实现 ==========

function useGetters(
  keys: (keyof RootGetters)[] | Record<string, keyof RootGetters>
) {
  const store = useStore();
  const result: Record<string, any> = {};

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key as string] = computed(() => store.getters[key]);
    });
  } else {
    Object.entries(keys).forEach(([alias, key]) => {
      result[alias] = computed(() => store.getters[key]);
    });
  }

  return result;
}

export default useGetters;
