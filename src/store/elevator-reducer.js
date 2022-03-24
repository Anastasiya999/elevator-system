import { elevators } from "./mock-elevators";
import { STATE } from "../constants/enums";
import { DIRECTION } from "../constants/enums";
import {
  chceckAvalaible,
  addTask,
  removeTask,
  moveUp,
  moveDown,
  isDirectionCorrect,
} from "./helpers";
import {
  ADD_PENDING,
  ADD_TASKS,
  CLOSE_DOOR,
  OPEN_DOOR,
  PICK_UP,
  SET_IDLE,
  STEP,
} from "./elevator-actions";

export const elevatorReducer = (state = elevators, action) => {
  switch (action.type) {
    case PICK_UP: {
      const { direction, destination } = action.payload;
      let elevator = chceckAvalaible(state, direction, destination);
      return [
        ...state.map((item) => {
          if (item.id == elevator) {
            return {
              ...item,
              isOpen: false,
              direction,
              state: STATE.MOVING,
              tasks: addTask(item.tasks, destination),
            };
          } else {
            return item;
          }
        }),
      ];
      /*return [
        ...state.map((item) => {
          if (item.id === elevator.chosen) {
            //case 1: busy
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
              //case 1: idle
              if (item.state === STATE.IDLE) {
                return {
                  ...item,
                  isOpen: false,
                  direction,
                  state: STATE.MOVING,
                  tasks: addTask(item.tasks, destination),
                };
              }
              //case 2: along the path
              return {
                ...item,
                tasks: addTask(item.tasks, destination),
              };
            }
          } else {
            return item;
          }
        }),
      ];*/
    }

    case STEP: {
      const { id } = action.payload;
      let destination, new_floor;
      return [
        ...state.map((item) => {
          if (item.id === id) {
            if (item.direction === DIRECTION.UP) {
              destination = item.tasks[0];
            } else {
              destination = item.tasks[item.tasks.length - 1];
            }

            if (item.current < destination) {
              new_floor = moveUp(item);
            } else {
              new_floor = moveDown(item);
            }

            if (item.current === destination) {
              return {
                ...item,
                isOpen: true,
                state: STATE.STOPPED,
                tasks: removeTask(item.tasks, item.direction),
              };
            } else {
              return {
                ...item,
                current: new_floor,
                destination: destination,
              };
            }

            // //up direction: get first task from queue
            // if (item.direction > 0) {
            //   if (item.tasks.length && item.current !== item.tasks[0]) {
            //     console.log("step");
            //     if (item.current < item.tasks[0]) {
            //       return {
            //         ...item,
            //         current: item.current + 1,
            //         destination: item.tasks[0],
            //       };
            //     } else {
            //       return {
            //         ...item,
            //         current: item.current - 1,
            //         destination: item.tasks[0],
            //       };
            //     }
            //   } else {
            //     console.log("removing task from queue");
            //     return {
            //       ...item,
            //       isOpen: true,
            //       state: STATE.STOPPED,
            //       tasks: removeTask(item.tasks, item.direction),
            //     };
            //   }
            //   //doen direction: get last task from queue
            // } else {
            //   if (
            //     item.tasks.length &&
            //     item.current !== item.tasks[item.tasks.length - 1]
            //   ) {
            //     console.log("step");
            //     if (item.current < item.tasks[0]) {
            //       return {
            //         ...item,
            //         current: item.current + 1,
            //         destination: item.tasks[item.tasks.length - 1],
            //       };
            //     } else {
            //       return {
            //         ...item,
            //         current: item.current - 1,
            //         destination: item.tasks[item.tasks.length - 1],
            //       };
            //     }
            //   } else {
            //     console.log("removing task from queue");

            //     return {
            //       ...item,
            //       isOpen: true,
            //       state: STATE.STOPPED,
            //       tasks: removeTask(item.tasks, item.direction),
            //     };
            //   }
            // }
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
            return { ...item, isOpen: false, state: STATE.MOVING };
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
          if (item.id === id && item.tasks.length === 0) {
            return { ...item, state: STATE.IDLE };
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
              state: STATE.MOVING,
              isOpen: false,
            };
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
              state: STATE.MOVING,
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
