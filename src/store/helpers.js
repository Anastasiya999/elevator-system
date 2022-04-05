import { DIRECTION } from "../constants/enums";
import { STATE } from "../constants/enums";

export const chceckAvalaible = (elevators, direction, destination) => {
  for (const item of elevators) {
    if (item.state == STATE.IDLE) {
      return item.id;
    }
  }
  /*let min = 1000;
    let diff;
    let chosen = -1;
    let temp;
    let up = false;
    let down = false;
    for (const item of elevators) {
      if (item.state === STATE.IDLE) {
        diff = Math.abs(item.current - destination);
        if (diff < min) {
          min = diff;
          chosen = item.id;
        }
      }
      if (item.direction === direction) {
        if (direction > 0) {
          //chceck if request along the path
          if (item.current <= destination) {
            diff = Math.abs(item.current - destination);
  
            if (diff < min) {
              min = diff;
              chosen = item.id;
            }
          } else {
            //flag pending up requests
            diff = item.current;
            up = true;
            if (diff < min) {
              min = diff;
              temp = item.id;
            }
          }
        } else {
          //chceck if request along the path
          if (item.current >= destination) {
            diff = Math.abs(item.current - destination);
  
            if (diff < min) {
              min = diff;
              temp = item.id;
            }
          } else {
            //flag pending down requests
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
          //flag pending down requests
          diff = 5 - item.current;
          if (diff < min) {
            min = diff;
            temp = item.id;
          }
          down = true;
        } else {
          //flag pending up requests
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
    }*/
};

export const addTask = (tasks, task) => {
  let newTasks = [...tasks];
  if (Array.isArray(task)) {
    newTasks.push(...task);
  } else {
    newTasks.push(task);
  }

  return Array.from(new Set(newTasks)).sort((a, b) => a - b);
};

export const removeTask = (tasks, direction) => {
  let newTasks = [...tasks];
  if (direction === DIRECTION.UP) {
    newTasks.shift();
  } else {
    newTasks.pop();
  }

  return newTasks;
};
export const moveUp = (elevator) => {
  return elevator.current + 1;
};
export const moveDown = (elevator) => {
  return elevator.current - 1;
};
export const isDirectionCorrect = (direction, currentFloor, tasks) => {
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
