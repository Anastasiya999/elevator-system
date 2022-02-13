import { elevators } from "./mock-elevators";
import {
  ADD_TASKS,
  CLOSE_DOOR,
  OPEN_DOOR,
  PICK_UP,
  SET_IDLE,
  STEP,
} from "./elevator-actions";

const chceckAvalaible = (elevators, direction, destination) => {
  let min = 10000;
  let diff;
  let chosen = -1;
  for (const item of elevators) {
    if (item.direction === direction) {
      if (direction > 0) {
        if (item.current <= destination) {
          //find the closest available elevator
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
  if (Array.isArray(task)) {
    newTasks.push(...task);
  } else {
    newTasks.push(task);
  }

  return Array.from(new Set(newTasks)).sort();
};

const removeTask = (tasks, direction) => {
  let newTasks = [...tasks];
  if (direction > 0) {
    newTasks.shift();
  } else {
    newTasks.pop();
  }

  return newTasks;
};

const isDirectionCorrect = (direction, currentFloor, tasks) => {
  let isCorrect = true;
  if (direction > 0) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i] < currentFloor) isCorrect = false;
      else {
        isCorrect = true;
      }
    }
  } else {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i] > currentFloor) isCorrect = false;
      else {
        isCorrect = true;
      }
    }
  }
  return isCorrect;
};

export const elevatorReducer = (state = elevators, action) => {
  switch (action.type) {
    case PICK_UP: {
      //check elevators status
      //update destination for chosen elevator
      //return new array with elevators
      const { direction, destination } = action.payload;
      console.log(direction, destination);
      let chosen = chceckAvalaible(state, direction, destination);
      console.log("chosen", chosen);
      return [
        ...state.map((item) => {
          if (item.id === chosen) {
            if (state === "MOVING") {
              return {
                ...item,
                tasks: addTask(item.tasks, destination),
              };
            }
            //if state is IDLE change elevator direction to pick up direction
            console.log("idle");
            return {
              ...item,
              isOpen: false,
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
            if (item.direction > 0) {
              if (item.current !== item.tasks[0] && item.tasks.length) {
                console.log(item.current, item.tasks[0]);
                if (item.current < item.tasks[0]) {
                  console.log("+");
                  return { ...item, current: item.current + 1 };
                } else {
                  return { ...item, current: item.current - 1 };
                }
              } else {
                console.log("removing task from queue");

                return {
                  ...item,
                  isOpen: true,
                  state: "STOPPED",
                  tasks: removeTask(item.tasks, item.direction),
                };
              }
            } else {
              if (
                item.tasks.length &&
                item.current !== item.tasks[item.tasks.length - 1]
              ) {
                console.log(item.current, item.tasks[0]);
                if (item.current < item.tasks[0]) {
                  console.log("+");
                  return { ...item, current: item.current + 1 };
                } else {
                  return { ...item, current: item.current - 1 };
                }
              } else {
                console.log("removing task from queue");

                return {
                  ...item,
                  isOpen: true,
                  state: "STOPPED",
                  tasks: removeTask(item.tasks, item.direction),
                };
              }
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
            return { ...item, isOpen: false };
          } else {
            return item;
          }
        }),
      ];
    }
    case SET_IDLE: {
      const { id } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            return { ...item, state: "IDLE" };
          } else {
            return item;
          }
        }),
      ];
    }
    case ADD_TASKS: {
      const { id, requests } = action.payload;

      return [
        ...state.map((item) => {
          if (item.id === id) {
            let newTasks = addTask(item.tasks, requests);
            let isDirCorrect = isDirectionCorrect(
              item.direction,
              item.current,
              newTasks
            );
            return {
              ...item,
              direction: isDirCorrect ? item.direction : -item.direction,
              tasks: newTasks,
              state: "MOVING",
              isOpen: false,
            };
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
