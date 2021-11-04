import { createTheme } from "@material-ui/core";
import { deepOrange, grey, indigo } from "@material-ui/core/colors";

const darkTheme = createTheme({
  palette: {
    background: {
      default: grey[900],
    },
    type: "dark",
    text: {
      primary: grey[300],
      secondary: grey[300],
      disabled: grey[600],
      hint: grey[300],
    },
    primary: { main: indigo[900] },
    secondary: deepOrange,
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
