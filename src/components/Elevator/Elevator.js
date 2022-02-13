import React, { useState } from "react";
import { useRef, useEffect } from "react";
import { DIRECTION } from "../../constants/enums";
import { STATE } from "../../constants/enums";
import { Floor } from "../Floor/Floor";
import { Box, Divider, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { Paper } from "@material-ui/core";

import KeyboardArrowUpSharpIcon from "@material-ui/icons/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@material-ui/icons/KeyboardArrowDownSharp";
import { useElevatorWorker } from "../../hooks/useElevatorWorker";
import { useDispatch, useSelector } from "react-redux";

const Elevator = ({ id }) => {
  const dispatch = useDispatch();
  const elevatorInfo = useSelector((state) => state.elevators[id]);

  const classes = useStyles();

  useEffect(() => {
    if (elevatorInfo.state === STATE.MOVING) {
      console.log(elevatorInfo);
      dispatch({
        type: "STEP",
        payload: {
          id: id,
        },
        meta: {
          delayMs: 1000,
        },
      });
    }
    if (
      elevatorInfo.state === STATE.STOPPED &&
      elevatorInfo.tasks.length !== 0
    ) {
      //close door automatically after delay
      dispatch({
        type: "CLOSE_DOOR",
        payload: {
          id: id,
        },
        meta: {
          delayMs: 5000,
        },
      });
    }
  }, [elevatorInfo.state, elevatorInfo.current]);

  useEffect(() => {
    if (elevatorInfo.tasks.length === 0) {
      //check for pending tasks
      if (elevatorInfo.down.length || elevatorInfo.down.length) {
        dispatch({
          type: "ADD_PENDING",
          payload: {
            id: id,
          },
        });
      } else {
        dispatch({
          type: "SET_IDLE",
          payload: {
            id: id,
          },
        });
      }
    }
  }, [elevatorInfo.tasks]);

  const pickUp = () => {};
  const close = (requests) => {
    //add inner requests
    dispatch({
      type: "ADD_TASKS",
      payload: {
        id: id,
        requests: requests,
      },
    });
  };
  const renderDirection = () => {
    if (elevatorInfo.direction < 0) return <KeyboardArrowDownSharpIcon />;
    return <KeyboardArrowUpSharpIcon />;
  };
  /* const { status, currentFloor, error, step } = useElevatorWorker();
  

  const [isOpen, setOpen] = useState(false);
  const [state, setState] = useState("IDLE");
  const [destinationFloor, setDestination] = useState(-1);

  const up = useRef([]);
  const down = useRef([]);
  const tasks = useRef([]);
  const direction = useRef(DIRECTION.UP);

  const [call, setCall] = useState(false);
  const [currentTasks, setTasks] = useState([]);

  const classes = useStyles();

  const pickUp = (dir, source) => {
    addTask(+dir, +source);

    if (!isLaunch()) {
      setState(STATE.MOVING);
    }

    if (isTaskAlongThePath()) update();
  };

  const isTaskAlongThePath = () => {
    if (state === STATE.MOVING && tasks.current.length > currentTasks.length)
      return true;
    return false;
  };

  const isLaunch = () => {
    if (state === STATE.IDLE) return false;
    return true;
  };

  const addTask = (dir, source) => {
    if (state === STATE.IDLE) {
      direction.current = dir;
      tasks.current.push(source);
    } else {
      if (direction.current === dir) {
        if (dir === DIRECTION.UP) {
          if (currentFloor <= source) {
            tasks.current.push(source);
          } else {
            up.current.push(source);
          }
        } else {
          if (currentFloor >= source) {
            tasks.current.push(source);
          } else {
            down.current.push(source);
          }
        }
      } else {
        if (dir === DIRECTION.DOWN) {
          down.current.push(source);
        } else {
          up.current.push(source);
        }
      }
    }
  };

  const close = (requests) => {
    for (let i = 0; i < requests.length; i++) {
      addTask(direction.current, +requests[i]);
    }

    setOpen(false);
    setState(STATE.MOVING);
  };

  const canProcess = () => {
    if (state !== STATE.IDLE && !isOpen) {
      return true;
    }
    return false;
  };

  const makeUnique = () => {
    tasks.current = Array.from(new Set(tasks.current)).sort();
    up.current = Array.from(new Set(up.current)).sort();
    down.current = Array.from(new Set(down.current)).sort();
  };

  const isEmpty = (requests) => {
    return requests.length === 0;
  };

  const isDirectionCorrect = () => {
    let isCorrect = true;
    if (direction.current === DIRECTION.UP) {
      for (let i = 0; i < tasks.current.length; i++) {
        if (tasks.current[i] < currentFloor) isCorrect = false;
        else {
          isCorrect = true;
        }
      }
    } else {
      for (let i = 0; i < tasks.current.length; i++) {
        if (tasks.current[i] > currentFloor) isCorrect = false;
        else {
          isCorrect = true;
        }
      }
    }
    return isCorrect;
  };

  const update = () => {
    makeUnique();

    if (isEmpty(tasks.current)) {
      if (up.current.length) {
        direction.current = DIRECTION.UP;
      }
      if (down.current.length) {
        direction.current = DIRECTION.DOWN;
      }
    }
    if (isEmpty(tasks.current)) {
      if (direction.current === DIRECTION.UP) {
        tasks.current = [...up.current];
        up.current = [];
      } else {
        tasks.current = [...down.current];
        down.current = [];
      }
      if (!isDirectionCorrect()) {
        direction.current = -direction.current;
      }
      setTasks([...tasks.current]);
    } else {
      if (!isDirectionCorrect()) {
        direction.current = -direction.current;
      }
      setTasks([...tasks.current]);
    }
  };

  const processTask = (task) => {
    if (task !== currentFloor) {
      step(id, currentFloor, task);
    } else {
      if (direction.current === DIRECTION.DOWN) {
        tasks.current.pop();
      } else {
        tasks.current.shift();
      }
      setState(STATE.STOPPED);
      setOpen(true);

      //close the door automatically
      setTimeout(() => {
        setOpen(false);
      }, 8000);
    }
  };

  useEffect(() => {
    if (canProcess) update();
  }, [isOpen, state]);

  useEffect(() => {
    if (!isEmpty(currentTasks)) {
      if (direction.current === DIRECTION.UP) {
        if (destinationFloor === currentTasks[0]) {
          setCall((prev) => !prev);
        }
        setDestination(currentTasks[0]);
      } else {
        if (destinationFloor === currentTasks[currentTasks.length - 1]) {
          setCall((prev) => !prev);
        }
        setDestination(currentTasks[currentTasks.length - 1]);
      }
    } else {
      setState(STATE.IDLE);
    }
  }, [currentTasks, elevatorInfo]);

  useEffect(() => {
    if (state !== STATE.IDLE && !isOpen) {
      processTask(+destinationFloor);
    }
  }, [destinationFloor, call, currentFloor]);

  const renderDirection = () => {
    if (currentFloor > destinationFloor && destinationFloor !== -1)
      return <KeyboardArrowDownSharpIcon />;
    return <KeyboardArrowUpSharpIcon />;
  };
*/
  return (
    <Box className={classes.elevator}>
      <Paper className={classes.status_container} elevation={10}>
        <Typography variant="h6">{elevatorInfo.current}</Typography>
        <Typography variant="subtitle1" color="secondary">
          {elevatorInfo.isOpen ? "Door is openned" : renderDirection()}
        </Typography>
      </Paper>

      <Floor
        number={5}
        pickUp={pickUp}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={4}
        pickUp={pickUp}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={3}
        pickUp={pickUp}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={2}
        pickUp={pickUp}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={1}
        pickUp={pickUp}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={0}
        pickUp={pickUp}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
    </Box>
  );
};
export default Elevator;
