import React from "react";

import Door from "./Door/Door";
import { Grid, Box, Paper } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import ArrowUpwardOutlined from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded";
import { useRef } from "react";
import useStyles from "./styles";
import { PickUpButton } from "../PickUpList/PickUpButton";

export const Floor = ({ number, pickUp, close, isCurrent, isOpen }) => {
  const requests = useRef([]);
  const classes = useStyles();

  const handleClick = (e) => {
    requests.current.push(e.currentTarget.value);
  };
  const handleClose = () => {
    //close(requests.current);
    close();
    requests.current = [];
  };

  return (
    <Grid container className={classes.floor_container}>
      <Grid item md={5} xs={5}>
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
      <Grid item md={5}>
        <PickUpButton floor={number} />
      </Grid>
    </Grid>
  );
};
