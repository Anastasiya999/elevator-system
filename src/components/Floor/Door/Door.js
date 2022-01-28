import React from "react";
import { Controller } from "../../Controller/Controller";
import useStyles from "./styles";
import { Paper } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { Box } from "@material-ui/core";

export default function Door({ isOpen, handleClose, handleClick }) {
  const classes = useStyles();
  return (
    <Fade in easing="easeOut" timeout={500}>
      <Paper elevation={6}>
        <Box className={classes.elevator}>
          {isOpen ? (
            <Controller onClose={handleClose} onClick={handleClick} />
          ) : null}
        </Box>
      </Paper>
    </Fade>
  );
}
