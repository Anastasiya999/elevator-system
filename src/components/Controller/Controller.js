import React from "react";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

export const Controller = ({ onClose, onClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.controller}>
      <Box className={classes.button_container}>
        <button onClick={onClick} value={0} className={classes.control_button}>
          0
        </button>
        <button onClick={onClick} value={1} className={classes.control_button}>
          1
        </button>
        <button onClick={onClick} value={2} className={classes.control_button}>
          2
        </button>
        <button onClick={onClick} value={3} className={classes.control_button}>
          3
        </button>
        <button onClick={onClick} value={4} className={classes.control_button}>
          4
        </button>
        <button onClick={onClick} value={5} className={classes.control_button}>
          5
        </button>
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
