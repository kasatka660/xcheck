import { createStore, AnyAction } from "redux";
import { MakeStore, createWrapper, Context, HYDRATE } from "next-redux-wrapper";

// For references look at https://github.com/kirill-konshin/next-redux-wrapper.

export interface State {
  tick: string;
}

// Base reducer.
const reducer = (state: State = { tick: "init" }, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    //return state;
    case "TICK":
      return { ...state, tick: action.payload };
    default:
      return state;
  }
};

// Create a makeStore function.
const makeStore: MakeStore<State> = (context: Context) => createStore(reducer);

// Export an assembled wrapper.
export const reduxWrapper = createWrapper<State>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
