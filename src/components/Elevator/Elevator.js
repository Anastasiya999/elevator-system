import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import KeyboardArrowUpSharpIcon from "@material-ui/icons/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@material-ui/icons/KeyboardArrowDownSharp";
import { Box, Divider, Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Floor } from "../Floor/Floor";

import { STATE } from "../../constants/enums";
import {
  STEP,
  SET_IDLE,
  ADD_PENDING,
  ADD_TASKS,
  CLOSE_DOOR,
} from "../../store/elevator-actions";

import useStyles from "./styles";

const Elevator = ({ id }) => {
  const dispatch = useDispatch();
  const elevatorInfo = useSelector((state) => state.elevators[id]);

  const classes = useStyles();

  useEffect(() => {
    if (elevatorInfo.state === STATE.MOVING) {
      dispatch({
        type: STEP,
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
        type: CLOSE_DOOR,
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
      dispatch({
        type: SET_IDLE,
        payload: {
          id: id,
        },
        meta: {
          delayMs: 5000,
        },
      });
    }
  }, [elevatorInfo.tasks]);

  const close = (requests) => {
    //add inner requests
    dispatch({
      type: ADD_TASKS,
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

  // useEffect(() => {
  //   if (elevatorInfo.tasks.length === 0) {
  //     //check for pending tasks
  //     if (elevatorInfo.down.length || elevatorInfo.up.length) {
  //       dispatch({
  //         type: ADD_PENDING,
  //         payload: {
  //           id: id,
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: SET_IDLE,
  //         payload: {
  //           id: id,
  //         },
  //         meta: {
  //           delayMs: 5000,
  //         },
  //       });
  //     }
  //   }
  // }, [elevatorInfo.tasks]);

  return (
    <Box className={classes.elevator}>
      <Paper className={classes.status_container} elevation={10}>
        <Typography variant="h6">
          {"Elevator " +
            elevatorInfo.id +
            " is on " +
            elevatorInfo.current +
            "-" +
            elevatorInfo.destination}
        </Typography>
        <Typography variant="subtitle1" color="secondary">
          {elevatorInfo.isOpen ? "Door is openned" : renderDirection()}
        </Typography>
      </Paper>

      <Floor
        number={5}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={4}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={3}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={2}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={1}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
      <Divider />
      <Floor
        number={0}
        close={close}
        isCurrent={elevatorInfo.current}
        isOpen={elevatorInfo.isOpen}
      />
    </Box>
  );
};
export default Elevator;
