import React from "react";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import useStyles from "./styles";
import { arrayWithFloorNumbers } from "../../store/mock-floors";

export const Controller = ({ onClose, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.controller}>
      <Box className={classes.button_container}>
        {arrayWithFloorNumbers.map((value, index) => {
          return (
            <button
              onClick={onClick}
              key={index}
              value={value}
              className={classes.control_button}
            >
              {value}
            </button>
          );
        })}
      </Box>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={onClose}
        className={classes.close_button}
      >
        close door
      </Button>
    </Box>
  );
};
