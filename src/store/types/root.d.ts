import { Store as VuexStore } from "vuex";
import { State } from "@/store/modules/common/state";
import {
  RootGetters,
  RootCommit,
  RootDispatch,
} from "@/store/types/types-helper";

type RootState = {
  version: string;
  commonModule: State; // 让ts推导安全检测，如store.state.commonModule.xxx
};

type MutationsInRoot = {
  fn(state: RootState, payload: number): void;
};

interface EnhancedStore
  extends Omit<VuexStore<RootState>, "getters" | "commit" | "dispatch"> {
  getters: RootGetters;
  commit: RootCommit;
  dispatch: RootDispatch;
}

export { RootState, EnhancedStore, MutationsInRoot };
