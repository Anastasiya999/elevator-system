import { Grid } from "@material-ui/core";

import React from "react";

import useStyles from "./styles";
import { PickUpButton } from "./PickUpButton";

export const PickUpList = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.pickUp_list}>
      <Grid item md={12} xs={12}>
        <PickUpButton floor={5} />
      </Grid>
      <Grid item md={12} xs={12}>
        <PickUpButton floor={4} />
      </Grid>
      <Grid item md={12} xs={12}>
        <PickUpButton floor={3} />
      </Grid>
      <Grid item md={12} xs={12}>
        <PickUpButton floor={2} />
      </Grid>
      <Grid item md={12} xs={12}>
        <PickUpButton floor={1} />
      </Grid>
      <Grid item md={12} xs={12}>
        <PickUpButton floor={0} />
      </Grid>
    </Grid>
  );
};
