import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  pickUp_list: {
    position: "fixed",
    top: "15%",
    left: "5%",
    gap: "2%",
    maxWidth: "10%",
    height: "80%",
    zIndex: "1000",
  },
  pickUp: {
    maxWidth: "100px",
  },
}));
