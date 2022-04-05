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
} from "../constants/action-types";

const applyPickUpTasks = (state, action) => {
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
};

const applyStep = (state, action) => {
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
      } else {
        return item;
      }
    }),
  ];
};

const applyCloseDoor = (state, action) => {
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
};

const applySetIdle = (state, action) => {
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
};

const applyAddTasks = (state, action) => {
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
};

const applyOpenDoor = (state, action) => {
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
};

const applyAddPending = (state, action) => {
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
};

export const elevatorReducer = (state = elevators, action) => {
  switch (action.type) {
    case PICK_UP: {
      return applyPickUpTasks(state, action);
    }
    case STEP: {
      return applyStep(state, action);
    }
    case CLOSE_DOOR: {
      return applyCloseDoor(state, action);
    }
    case SET_IDLE: {
      return applySetIdle(state, action);
    }
    case ADD_TASKS: {
      return applyAddTasks(state, action);
    }
    case OPEN_DOOR: {
      return applyOpenDoor(state, action);
    }
    case ADD_PENDING: {
      return applyAddPending(state, action);
    }
    default:
      return state;
  }
};
