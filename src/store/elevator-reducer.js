import { elevators } from "./mock-elevators";

export const elevatorReducer = (state = elevators, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
