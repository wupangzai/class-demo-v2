import { useStore } from "@/store";
import { Mutations } from "@/store/modules/common/mutations";
import { CommitOptions } from "vuex";

// ========== 类型工具 ==========

// 将 mutation 转换为调用函数（根据 payload 是否可选处理参数）
type MutationFn<T> = T extends (state: any, payload: infer P) => any
  ? undefined extends P
    ? (payload?: P, options?: CommitOptions) => void
    : (payload: P, options?: CommitOptions) => void
  : (payload?: never, options?: CommitOptions) => void;

// 将 Mutation 对象转换为 commit 工具集
type MutationMapper<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: MutationFn<T[K]>;
};

// ========== 重载定义 ==========

// 方式 1：传数组（返回 Pick 工具函数）
function useCommonMutations<K extends keyof Mutations>(
  keys: K[]
): Pick<MutationMapper<Mutations>, K>;

// 方式 2：传别名映射（返回别名类型）
function useCommonMutations<M extends Record<string, keyof Mutations>>(
  keys: M
): { [K in keyof M]: MutationFn<Mutations[M[K]]> };

// ========== 实现 ==========

function useCommonMutations(
  keys: (keyof Mutations)[] | Record<string, keyof Mutations>
) {
  const store = useStore();
  const result: Record<string, any> = {};

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key as string] = (payload?: any, options?: CommitOptions) =>
        store.commit(`commonModule/${key}`, payload, options);
    });
  } else {
    Object.entries(keys).forEach(([alias, key]) => {
      result[alias] = (payload?: any, options?: CommitOptions) =>
        store.commit(`commonModule/${key}`, payload, options);
    });
  }

  return result;
}

/**
 * 含有payload的mutation使用时，不传会报错
 * 定义时未定义的则为可选，undefined
 *
 */
export default useCommonMutations;
