import { State } from "@/store/modules/common/state";
import { Store as VuexStore } from "vuex";

export type RootState = {
  commonModule: State; // 让ts推导安全检测，如store.state.commonModule.xxx
};

interface EnhancedStore
  extends Omit<VuexStore<RootState>, "getters" | "commit" | "dispatch"> {
  getters: RootGetters;
  commit: RootCommit;
  dispatch: RootDispatch;
}

export { RootState, EnhancedStore };
