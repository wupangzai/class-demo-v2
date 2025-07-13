import { useStore } from "@/store";
import { DispatchOptions } from "vuex";
import { RootActions } from "@/store/types/types-helper";

// 类型工具：根据 RootActions 里每个函数的参数推导 payload 类型，定义 dispatch 函数签名
type ActionFn<T extends (...args: any) => any> = T extends (
  context: any,
  payload: infer P
) => any
  ? undefined extends P
    ? (payload?: P, options?: DispatchOptions) => ReturnType<T>
    : (payload: P, options?: DispatchOptions) => ReturnType<T>
  : (payload?: never, options?: DispatchOptions) => ReturnType<T>;

// 将 RootActions 转成 dispatch 调用映射
type ActionMapper<T extends Record<string, (...args: any[]) => any>> = {
  [K in keyof T]: ActionFn<T[K]>;
};

// 重载定义

// 1. 数组形式，返回 Pick
function useActions<K extends keyof RootActions>(
  keys: K[]
): Pick<ActionMapper<RootActions>, K>;

// 2. 别名映射形式，返回对应别名映射
function useActions<M extends Record<string, keyof RootActions>>(
  keys: M
): { [K in keyof M]: ActionFn<RootActions[M[K]]> };

// 实现
function useActions(
  keys: (keyof RootActions)[] | Record<string, keyof RootActions>
) {
  const store = useStore();
  const result: Record<string, any> = {};

  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key as string] = (payload?: any, options?: DispatchOptions) =>
        store.dispatch(key as keyof RootActions, payload, options);
    });
  } else {
    Object.entries(keys).forEach(([alias, key]) => {
      result[alias] = (payload?: any, options?: DispatchOptions) =>
        store.dispatch(key, payload, options);
    });
  }

  return result;
}
export default useActions;
