import { State } from "./state";
import { INCREMENT } from "./mutation-types";

type Mutations = {
  [INCREMENT](state: State): void;
};

const mutations: Mutations = {
  [INCREMENT](state: State) {
    state.number++;
  },
};

export { Mutations, mutations };
