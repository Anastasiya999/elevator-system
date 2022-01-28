import { useWorker } from "./useWebworker";

const changeStatus = (data) => {
  let current;
  if (+data[1] > +data[2]) {
    current = +data[1] - 1;
  } else {
    current = +data[1] + 1;
  }
  let status = "Elevator-" + data[0] + " jest na " + current + "-" + data[2];
  return { msg: status, floor: current };
};
export const useElevatorWorker = () => {
  return useWorker(changeStatus);
};
