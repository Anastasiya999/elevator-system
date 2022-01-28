import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  floor: {
    height: "14vh",
  },
  floor_container: {
    justifyContent: "space-between",
  },
  pickUp_container: {
    display: "flex",
    direction: "row",
    justifyItems: "space-between",
    placeContent: "center",
  },
}));
