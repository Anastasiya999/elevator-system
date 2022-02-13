import { Paper, IconButton, Box } from "@material-ui/core";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded";

import React from "react";
import useStyles from "./styles";
import { useDispatch } from "react-redux";

export const PickUpButton = ({ floor }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handlePickUp = (e) => {
    //add outer request
    dispatch({
      type: "PICK_UP",
      payload: {
        direction: +e.currentTarget.value,
        destination: floor,
      },
    });
  };
  return (
    <Paper elevation={1} className={classes.pickUp}>
      <Box>
        <IconButton
          onClick={handlePickUp}
          value={1}
          aria-label="arrow-upward"
          size="medium"
        >
          <ArrowUpwardOutlined />
        </IconButton>
        <IconButton
          onClick={handlePickUp}
          value={-1}
          aria-label="arrow-down"
          size="medium"
        >
          <ArrowDownwardRounded />
        </IconButton>
      </Box>
    </Paper>
  );
};
