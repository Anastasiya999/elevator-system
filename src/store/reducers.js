import { combineReducers } from "redux";
import { elevatorReducer } from "./elevator-reducer";

export const rootReducer = combineReducers({
  elevators: elevatorReducer,
});
