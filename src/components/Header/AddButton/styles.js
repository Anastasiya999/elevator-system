import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  add_button: {
    [theme.breakpoints.down("md")]: {
      size: "small",
      maxHeight: "10vh",
      width: "min(40vw, 150px)",
    },
  },
}));
