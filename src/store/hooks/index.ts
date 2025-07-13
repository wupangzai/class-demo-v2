import useStates from "@/store/hooks/common/useStates";
import useGetters from "@/store/hooks/common/useGetters";
import useMutations from "@/store/hooks/common/useMutations";
import useActions from "@/store/hooks/common/useActions";

export { useStates, useGetters, useMutations, useActions };

/**
 * 使用方法
 *
 * const { version } = useStates(["version"]);  //rootState
   const { number, test } = useStates("commonModule", ["number", "test"]);  // moduleState
 *
 *
 * const { "commonModule/total": total, name } = useGetters(["commonModule/total","name"]);
 *
 * const { "commonModule/DECREMENT": DECREMENT, fn } = useMutations(['commonModule/DECREMENT', 'fn'])
 *
 * const { "commonModule/DECREMENT_ACTION": DECREMENT_ACTION, fn } = useActions(['commonModule/DECREMENT_ACTION', 'fn'])
 *
 */
