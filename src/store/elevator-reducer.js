import { elevators } from "./mock-elevators";
import {
  ADD_PENDING,
  ADD_TASKS,
  CLOSE_DOOR,
  OPEN_DOOR,
  PICK_UP,
  SET_IDLE,
  STEP,
} from "./elevator-actions";

const chceckAvalaible2 = (elevators, direction, destination) => {
  let min = 1000;

  let diff;
  let chosen = -1;
  let temp;
  let up = false;
  let down = false;
  for (const item of elevators) {
    if (item.state === "IDLE") {
      diff = Math.abs(item.current - destination);
      if (diff < min) {
        min = diff;
        chosen = item.id;
      }
    }
    if (item.direction === direction) {
      if (direction > 0) {
        if (item.current <= destination) {
          diff = Math.abs(item.current - destination);

          if (diff < min) {
            min = diff;
            chosen = item.id;
          }
        } else {
          diff = item.current;
          up = true;
          if (diff < min) {
            min = diff;
            temp = item.id;
          }
        }
      } else {
        if (item.current >= destination) {
          diff = Math.abs(item.current - destination);

          if (diff < min) {
            min = diff;
            temp = item.id;
          }
        } else {
          //can be in down queue
          diff = 5 - item.current;
          down = true;
          if (diff < min) {
            min = diff;
            temp = item.id;
          }
        }
      }
    } else {
      if (item.direction > 0) {
        diff = 5 - item.current;
        if (diff < min) {
          min = diff;
          temp = item.id;
        }
        down = true;
      } else {
        diff = item.current;
        if (diff < min) {
          min = diff;
          temp = item.id;
        }
        up = true;
      }
    }
  }
  if (chosen === -1) {
    return { chosen: temp, up: up, down: down };
  } else {
    return { chosen: chosen, up: false, down: false };
  }
};

const chceckAvalaible = (elevators, direction, destination) => {
  let min = 10000;
  let diff;
  let chosen = -1;

  for (const item of elevators) {
    if (item.direction === direction) {
      if (item.state === "IDLE") {
        diff = Math.abs(item.current - destination);
        if (diff < min) {
          min = diff;
          chosen = item.id;
        }
      }
      if (direction > 0) {
        if (item.current <= destination && !item.isOpen) {
          //find the closest available elevator
          diff = Math.abs(item.current - destination);

          if (diff < min) {
            min = diff;
            chosen = item.id;
          }
        } else {
          //not available now
        }
      } else {
        if (item.current >= destination && !item.isOpen) {
          diff = Math.abs(item.current - destination);

          if (diff < min) {
            min = diff;
            chosen = item.id;
          }
        } else {
          //not available now
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
const update = (elevator, destination) => {
  if (elevator.tasks.length && elevator.current !== destination) {
    console.log("step");
    if (elevator.current < destination) {
      return { ...elevator, current: elevator.current + 1 };
    } else {
      return { ...elevator, current: elevator.current - 1 };
    }
  } else {
    console.log("removing task from queue");
    return {
      ...elevator,
      isOpen: true,
      state: "STOPPED",
      tasks: removeTask(elevator.tasks, elevator.direction),
    };
  }
};
export const elevatorReducer = (state = elevators, action) => {
  switch (action.type) {
    case PICK_UP: {
      //check elevators status
      //update destination for chosen elevator
      //return new array with elevators
      const { direction, destination } = action.payload;

      let chosen = chceckAvalaible(state, direction, destination);
      let elevator = chceckAvalaible2(state, direction, destination);
      if (elevator.down || elevator.up) {
        console.log(
          "need to add to queue",
          elevator.down,
          elevator.up,
          elevator.chosen
        );
      }
      //if busy add task to queue: up or down

      return [
        ...state.map((item) => {
          if (item.id === elevator.chosen) {
            if (elevator.up) {
              return {
                ...item,
                up: addTask(item.up, destination),
              };
            } else if (elevator.down) {
              return {
                ...item,
                down: addTask(item.down, destination),
              };
            } else {
              if (item.state === "IDLE") {
                return {
                  ...item,
                  isOpen: false,
                  direction,
                  state: "MOVING",
                  tasks: addTask(item.tasks, destination),
                };
              }
              return {
                ...item,
                tasks: addTask(item.tasks, destination),
              };
            }
            /*
            if (item.state === "MOVING") {
              return {
                ...item,
                tasks: addTask(item.tasks, destination),
              };
            }
            if (state === "STOPPED") {
              console.log("adding to the up queue");
            }
           
            if (item.state !== "STOPPED") {
              return {
                ...item,
                isOpen: false,
                direction,
                state: "MOVING",
                tasks: addTask(item.tasks, destination),
              };
            } else {
              return item;
            }*/
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
              if (item.tasks.length && item.current !== item.tasks[0]) {
                console.log("step");
                if (item.current < item.tasks[0]) {
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
                console.log("step");
                if (item.current < item.tasks[0]) {
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
      console.log("idle");
      return [
        ...state.map((item) => {
          if (item.id === id && item.tasks.length === 0) {
            return { ...item, state: "IDLE" };
          } else {
            return item;
          }
        }),
      ];
    }
    case ADD_PENDING: {
      const { id } = action.payload;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            let newTasks;
            if (item.down.length !== 0) {
              newTasks = addTask(item.tasks, item.down);
            } else {
              newTasks = addTask(item.tasks, item.up);
            }
            return {
              ...item,
              up: [],
              down: [],
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
