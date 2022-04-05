import {
  STEP,
  CLOSE_DOOR,
  ADD_TASKS,
  SET_IDLE,
} from "../constants/action-types";

const doStep = (id, delayMs) => ({
  type: STEP,
  payload: {
    id,
  },
  meta: {
    delayMs,
  },
});

const doCloseDoor = (id, delayMs) => ({
  type: CLOSE_DOOR,
  payload: {
    id: id,
  },
  meta: {
    delayMs,
  },
});

const doAddTasks = (id, requests) => ({
  type: ADD_TASKS,
  payload: {
    id,
    requests,
  },
});

const doSetIdle = (id, delayMs) => ({
  type: SET_IDLE,
  payload: {
    id,
  },
  meta: {
    delayMs,
  },
});
export { doStep, doCloseDoor, doAddTasks, doSetIdle };
