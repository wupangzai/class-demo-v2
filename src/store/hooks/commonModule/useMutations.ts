import { useStore } from "@/store";
import { CommitOptions } from "vuex";
import { RootMutations } from "@/store/types/types-helper";

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
function useMutations<K extends keyof RootMutations>(
  keys: K[]
): Pick<MutationMapper<RootMutations>, K>;

// 方式 2：传别名映射（返回别名类型）
function useMutations<M extends Record<string, keyof RootMutations>>(
  keys: M
): { [K in keyof M]: MutationFn<RootMutations[M[K]]> };

// ========== 实现 ==========

function useMutations(
  keys: (keyof RootMutations)[] | Record<string, keyof RootMutations>
) {
  const store = useStore();
  const result: Record<string, any> = {};

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key as string] = (payload?: any, options?: CommitOptions) =>
        store.commit(key as keyof RootMutations, payload, options);
    });
  } else {
    Object.entries(keys).forEach(([alias, key]) => {
      result[alias] = (payload?: any, options?: CommitOptions) =>
        store.commit(key, payload, options);
    });
  }

  return result;
}

/**
 * 含有payload的mutation使用时，不传会报错
 * 定义时未定义的则为可选，undefined
 *
 */
export default useMutations;
