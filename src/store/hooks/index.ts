import useCommonState from "@/store/hooks/commonModule/useCommonState";
import useCommonGetters from "@/store/hooks/commonModule/useCommonGetters";
import useMutations from "@/store/hooks/commonModule/useMutations";
import useCommonActions from "@/store/hooks/commonModule//useCommonActions";

export {
  // commonModule store
  useCommonState,
  useCommonGetters,
  useMutations,
  useCommonActions,
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
 * const { xxx, bbb } = useCommonActions(["xxx", "bbb"]),  xxx, bbb  =>  Fn
 *
 *
 *
 *
 */
