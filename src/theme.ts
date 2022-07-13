import { createTheme } from "@material-ui/core/styles";
import { deepOrange, grey, indigo } from "@material-ui/core/colors";

const darkTheme = createTheme({
  palette: {
    background: {
      default: grey[900],
    },
    type: "dark",
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
    },
    primary: { main: indigo[900], light: "#474f97", dark: "#121858" },
    secondary: { main: deepOrange[400] },
  },
});

const lightTheme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
    type: "dark",
    text: {
      primary: grey[900],
      secondary: grey[600],
      disabled: grey[900],
      hint: grey[900],
    },
    primary: { main: indigo[400] },
    secondary: deepOrange,
  },
});

export default darkTheme;
