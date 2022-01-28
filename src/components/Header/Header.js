import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Slide } from "@material-ui/core";
import { useScrollTrigger } from "@material-ui/core";
import AddButton from "./AddButton/AddButton";

import useStyles from "./styles";

const Header = ({ onClick }) => {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Grid container className={classes.header}>
        <Grid item md={6} className={classes.title}>
          <Typography variant="h5" color="secondary">
            Elevator system
          </Typography>
        </Grid>
        <Grid item md={6} className={classes.action_button}>
          <AddButton onClick={onClick} />
        </Grid>
      </Grid>
    </Slide>
  );
};

export default Header;
