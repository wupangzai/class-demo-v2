import { INCREMENT_ACTION, DECREMENT_ACTION } from "./actions-types";
import { State } from "./state";
import { ActionContext as VuexActionContext, ActionTree } from "vuex";
import { RootState } from "@/store/types/root";

type CommonActionContext = VuexActionContext<State, RootState>;

type Actions = {
  [INCREMENT_ACTION](context: CommonActionContext, payload: string): void;
  [DECREMENT_ACTION](): string;
};

const actions: ActionTree<State, RootState> & Actions = {
  async [INCREMENT_ACTION]() {},
  [DECREMENT_ACTION]() {
    return "123";
  },
};

export { Actions, actions };
