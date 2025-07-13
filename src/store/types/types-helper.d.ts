import { CommitOptions, DispatchOptions } from "vuex";

/**---------------------------------------Getters---------------------------------------------------------------- */
// 把某模块的 Getters 转换为 "模块名/方法名" 映射表
type NamespacedGetters<MName extends string, G> = {
  [K in keyof G as `${MName}/${string & K}`]: ReturnType<G[K]>;
};

import { Getters as CommonGetters } from "@/store/modules/common/getters";
type RootGetters = NamespacedGetters<"commonModule", CommonGetters>;
// 也可以合并多个模块：
/*
type RootGetters = NamespacedGetters<"commonModule", CommonGetters> &
                   NamespacedGetters<"user", UserGetters> &
                   ...
*/

/**---------------------------------------Getters---------------------------------------------------------------- */

/**---------------------------------------Mutations---------------------------------------------------------------- */

import { Mutations as CommonMutations } from "@/store/modules/common/mutations";
type NamespacedMutations<
  N extends string,
  M extends Record<string, (...args: any[]) => any>
> = {
  [K in keyof M as `${N}/${string & K}`]: M[K];
};

// 判断是否有 payload 的条件工具类型
type CommitParameters<F> = Parameters<F> extends [any, infer P]
  ? undefined extends P
    ? [payload?: P, options?: CommitOptions]
    : [payload: P, options?: CommitOptions]
  : [payload?: undefined, options?: CommitOptions]; // // 统一hooks和store类型检测，不传payload的时候保留payload签名，都是undefined

type CommitType<M extends Record<string, (...args: any[]) => any>> = <
  T extends keyof M
>(
  type: T,
  ...args: CommitParameters<M[T]>
) => ReturnType<M[T]>;

type RootMutations = NamespacedMutations<"commonModule", CommonMutations>; // 合并多个同getters拼接即可, 根模块则直接拼接即可
type RootCommit = CommitType<RootMutations>;
/**---------------------------------------Mutations---------------------------------------------------------------- */

/**---------------------------------------Actions---------------------------------------------------------------- */
import { Actions as CommonActions } from "@/store/modules/common/actions";
type NamespacedActions<
  N extends string,
  A extends Record<string, (...args: any[]) => any>
> = {
  [K in keyof A as `${N}/${string & K}`]: A[K];
};

// 封装 dispatch 类型
type DispatchType<A extends Record<string, (...args: any[]) => any>> = <
  T extends keyof A
>(
  type: T,
  ...args: Parameters<A[T]> extends [any, infer P]
    ? [payload: P, options?: DispatchOptions]
    : [payload?: undefined, options?: DispatchOptions] // 统一hooks和store类型检测，不传payload的时候保留payload签名，都是undefined
) => ReturnType<A[T]>;

type RootActions = NamespacedActions<"commonModule", CommonActions>; // // 合并多个同actions拼接即可
type RootDispatch = DispatchType<RootActions>;
/**---------------------------------------Actions---------------------------------------------------------------- */

export { RootGetters, RootCommit, RootDispatch };
