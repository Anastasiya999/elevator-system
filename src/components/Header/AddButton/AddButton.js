import React from "react";
import { Button } from "@material-ui/core";
import useStyles from "./styles";

export default function AddButton({ onClick }) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      onClick={onClick}
      className={classes.add_button}
    >
      Add elevator
    </Button>
  );
}
