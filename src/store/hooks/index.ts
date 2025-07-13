import useCommonState from "@/store/hooks/commonModule/useCommonState";
import useCommonGetters from "@/store/hooks/commonModule/useCommonGetters";
import useMutations from "@/store/hooks/commonModule/useMutations";
import useActions from "@/store/hooks/commonModule//useActions";

export {
  // commonModule store
  useCommonState,
  useCommonGetters,
  useMutations,
  useActions,
};

/**
 * 使用方法
 *
 * const { xxx, bbb } = useCommonState(["xxx", "bbb"]),  xxx, bbb  =>  ComputedRef
 *
 *
 * const { xxx, bbb } = useCommonGetters(["xxx", "bbb"]),  xxx, bbb  =>  ComputedRef
 *
 *
 * const { xxx, bbb } = useMutations(["xxx", "bbb"]),  xxx, bbb  =>  Fn
 *
 *
 * const { xxx, bbb } = useActions(["xxx", "bbb"]),  xxx, bbb  =>  Fn
 *
 *
 *
 *
 */
