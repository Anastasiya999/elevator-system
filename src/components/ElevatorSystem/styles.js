import { makeStyles } from "@material-ui/core";
import Image from "../../assets/background-system.png";

export default makeStyles((theme) => ({
  system: {
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    minHeight: "100vh",
    padding: "10%",
    paddingTop: "6%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "20%",
    },
  },
  elevator_container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: "2%",
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
}));
