import React from "react";

import { Grid, Box, Select, MenuItem } from "@material-ui/core";
import { TransitionGroup } from "react-transition-group";
import { List } from "@material-ui/core";
import { useState } from "react";
import { Collapse } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import Header from "../Header/Header";
import Elevator from "../Elevator/Elevator";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const elevators = Array(16)
  .fill(0)
  .map((item, index) => <Elevator id={index} />);

const ElevatorSystem = () => {
  const items = useSelector((state) => state.elevators);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [floor, setFloor] = useState(0);

  const [elevatorCount, setElevatorCount] = useState(0);
  const handleChange = (event) => {
    //pickup
    dispatch({
      type: "PICK_UP",
      payload: {
        direction: 1,
        destination: event.target.value,
      },
    });
    setFloor(event.target.value);
  };

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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={floor}
            onChange={handleChange}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>

          <List>
            <TransitionGroup className={classes.elevator_container} spacing={2}>
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
