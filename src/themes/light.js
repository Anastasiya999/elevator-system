import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3752A1",
    },
    secondary: {
      main: "#F2542F",
    },
  },
  typography: {
    fontFamily: "Playfair Display",
    h6: {
      fontFamily: "Julius Sans One",
      fontSize: "1rem",
      fontWeight: 600,
    },
    button: {
      fontFamily: "Reenie Beanie",
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    body2: {
      fontFamily: "Roboto",
    },
    overline: {
      fontFamily: "Playfair Display",
    },
    h5: {
      fontFamily: "Dongle",
      fontSize: "2.2rem",
      lineHeight: 0.97,
    },
    subtitle1: {
      fontFamily: "Julius Sans One",
    },
    caption: {
      fontSize: "0.6rem",
      fontFamily: "Roboto",
    },
  },
});

export default theme;
