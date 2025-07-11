import { State } from "./state";

// Getters 类型
type Getters = {
  total(state: State): number;
};

const getters: Getters = {
  total(state: State) {
    return state.number + 100;
  },
};

export { Getters, getters };
