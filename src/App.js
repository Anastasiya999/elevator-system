import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import ElevatorSystem from "./components/ElevatorSystem/ElevatorSystem";
import customTheme from "./themes/light";

function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <ElevatorSystem />
      </ThemeProvider>
    </>
  );
}

export default App;
