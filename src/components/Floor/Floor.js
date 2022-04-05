import React from "react";

import Door from "./Door/Door";
import { Grid, Box } from "@material-ui/core";

import { useRef } from "react";
import useStyles from "./styles";

export const Floor = ({ number, close, isCurrent, isOpen, key }) => {
  const requests = useRef([]);
  const classes = useStyles();

  const handleClick = (e) => {
    requests.current.push(+e.currentTarget.value);
  };
  const handleClose = () => {
    close(requests.current);
    requests.current = [];
  };

  return (
    <Grid container className={classes.floor_container}>
      <Grid item md={8} xs={8}>
        <Box>
          <Box className={classes.floor}>
            {isCurrent === number && (
              <Door
                isOpen={isOpen}
                handleClick={handleClick}
                handleClose={handleClose}
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
