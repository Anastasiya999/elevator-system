import { makeStyles } from "@material-ui/core";
import { Widgets } from "@material-ui/icons";

export default makeStyles((theme) => ({
  controller: {
    display: "flex",
    direction: "column",
    flexWrap: "wrap",
    placeContent: "center",
    height: "14vh",
    backgroundColor: "rgba(4, 16, 40, 0.67)",
  },
  button_container: {
    maxWidth: "100px",
    display: "flex",
    flexWrap: "wrap",
    placeContent: "center",
  },
  close_button: {
    maxWidth: "100px",
    fontFamily: theme.typography.caption.fontFamily,
    fontSize: "0.65rem",
  },
  control_button: {
    fontFamily: theme.typography.h5.fontFamily,
    fontWeight: "400",
    fontSize: "1rem",
    width: "30px",
    border: "none",
    backgroundColor: "white",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.info.light,
    },
  },
}));
