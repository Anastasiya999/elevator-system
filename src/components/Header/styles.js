import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  header: {
    position: "fixed",
    top: "0%",
    padding: "2%",
    width: "100%",
    zIndex: "1000",
    alignContent: "center",
    justifyContent: "space-around",
  },
  title: {
    alignSelf: "center",
  },
  action_button: {
    flexBasis: "10%",
  },
}));
