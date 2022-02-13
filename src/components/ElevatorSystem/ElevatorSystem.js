import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { Grid, Box } from "@material-ui/core";
import { TransitionGroup } from "react-transition-group";
import { List } from "@material-ui/core";
import { Collapse } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { PickUpPanelControl } from "../PickUpPanelControl/PickUpPanelControl";
import Header from "../Header/Header";
import Elevator from "../Elevator/Elevator";

import useStyles from "./styles";

const elevators = Array(16)
  .fill(0)
  .map((item, index) => <Elevator id={index} />);

const ElevatorSystem = () => {
  const items = useSelector((state) => state.elevators);

  const classes = useStyles();

  const [elevatorCount, setElevatorCount] = useState(0);

  const renderItem = (item) => {
    return <ListItem>{item}</ListItem>;
  };

  const addElevator = () => {
    setElevatorCount((prev) => prev + 1);
  };

  return (
    <Grid container direction="column" className={classes.system}>
      <Header onClick={addElevator} />
      <Grid item>
        <Box>
          <List>
            <TransitionGroup className={classes.elevator_container} spacing={2}>
              <PickUpPanelControl />
              {elevators.filter((item, index) => {
                if (index < elevatorCount)
                  return (
                    <Collapse easing="easeIn" timeout={500}>
                      {renderItem(item)}
                    </Collapse>
                  );
              })}
            </TransitionGroup>
          </List>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ElevatorSystem;
