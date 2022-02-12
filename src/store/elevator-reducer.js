import { elevators } from "./mock-elevators";
import { CLOSE_DOOR, OPEN_DOOR, PICK_UP, STEP } from "./elevator-actions";

const chceckAvalaible = (elevators, direction, destination) => {
  let min = 10000;
  let diff;
  let chosen = -1;
  for (const item of elevators) {
    if (item.direction === direction) {
      if (direction > 0) {
        if (item.current <= destination) {
          diff = Math.abs(item.current - destination);

          if (diff < min) {
            min = diff;
            chosen = item.id;
          }
        }
      } else {
        if (item.current >= destination) {
          diff = Math.abs(item.current - destination);

          if (diff < min) {
            min = diff;
            chosen = item.id;
          }
        }
      }
    } else {
      if (item.state === "IDLE") {
        diff = Math.abs(item.current - destination);
        if (diff < min) {
          min = diff;
          chosen = item.id;
        }
      }
    }
  }
  return chosen;
};

const addTask = (tasks, task) => {
  let newTasks = [...tasks];
  newTasks.push(task);
  return Array.from(new Set(newTasks)).sort();
};

const removeTask = (tasks) => {
  let newTasks = [...tasks];
  newTasks.shift();
  return newTasks;
};

export const elevatorReducer = (state = elevators, action) => {
  switch (action.type) {
    case PICK_UP: {
      //check elevators status
      //update destination for chosen elevator
      //return new array with elevators
      const { direction, destination } = action.payload;
      let chosen = chceckAvalaible(state, direction, destination);
      console.log(chosen);
      return [
        ...state.map((item) => {
          if (item.id === chosen) {
            if (state === "MOVING") {
              return {
                ...item,
                tasks: addTask(item.tasks, destination),
              };
            }
            return {
              ...item,
              direction,
              state: "MOVING",
              tasks: addTask(item.tasks, destination),
            };
          } else {
            return item;
          }
        }),
      ];
    }

    case STEP: {
      const { id } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            if (item.current !== item.tasks[0]) {
              return { ...item, current: item.current + 1 };
            } else {
              console.log("removing task from queue");
              return {
                ...item,
                state: "STOPPED",
                tasks: removeTask(item.tasks),
              };
            }
          } else {
            return item;
          }
        }),
      ];
    }
    case OPEN_DOOR: {
      const { id } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            return { ...item, isOpen: true };
          } else {
            return item;
          }
        }),
      ];
    }
    case CLOSE_DOOR: {
      const { id } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            return { ...item, state: "MOVING", isOpen: false };
          } else {
            return item;
          }
        }),
      ];
    }
    default:
      return state;
  }
};
