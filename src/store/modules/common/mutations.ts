import { MutationTree } from "vuex";
import { State } from "./state";
import { INCREMENT, DECREMENT } from "./mutation-types";

type Mutations = {
  [INCREMENT](state: State, payload: number): void;
  [DECREMENT](state: State): void;
};

const mutations: MutationTree<State> & Mutations = {
  [INCREMENT](state, payload) {
    state.number += payload;
    console.log("mupayload", state.number);
  },

  [DECREMENT](state) {
    state.number--;
  },
};

export { Mutations, mutations };
