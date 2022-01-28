import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  elevator: {
    border: "3px solid #8391AE",
    minWidth: "220px",
    marginRight: "2%",
    marginBottom: "2%",
    backgroundColor: "rgba(131, 145, 174, 0.2)",
  },
  status_container: {
    display: "grid",
    direction: "column",
    placeContent: "center",
    textAlign: "center",
    marginBottom: "3%",
    height: "12vh",
  },
}));
