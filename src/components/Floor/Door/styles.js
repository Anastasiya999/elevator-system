import { makeStyles } from "@material-ui/core";
import Image from "../../../assets/door.png";

export default makeStyles(() => ({
  elevator: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "14vh",
    maxWidth: "120px",
  },
}));
