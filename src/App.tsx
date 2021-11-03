import React from "react";
import HomePage from "./HomePage/HomePage";
import SeasonPage from "./SeasonPage/SeasonPage";
import StartGameForm from "./StartGameForm";
import ScheduleSeasonForm from "./ScheduleSeasonForm";
import { Tabs, Tab, AppBar, Box, ThemeProvider, createMuiTheme } from "@material-ui/core";
import { Home, List, PlayArrow, PlaylistAdd } from "@material-ui/icons";
// import { createMuiTheme } from "@material-ui/core/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

/*const useStyles = makeStyles({
  root: { backgroundColor: "#000010", color: "white" },
});*/

const App = () => {
  /*const url = window.location.href;
  const domain = "http://localhost:3000";

  let path = "";
  if (url.indexOf(domain) === 0) {
    path = url.substr(domain.length);
  }

  switch (path) {
    case "/season":
      setValue(1);
      break;
    case "/addGame":
      setValue(2);
      break;
    default:
      setValue(0);
      break;
  }*/

  const theme = createMuiTheme({
    palette: {
      background: {
        default: "#eef",
      },
      /*text: {
        primary: "#000000",
        secondary: "#000000",
        disabled: "#000000",
        hint: "#000000",
      },*/
      primary: {
        light: "#7986cb",
        main: "#3f51b5",
        dark: "#303f9f",
        contrastText: "#fff",
      },
      secondary: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff",
      }
    },
  });

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background.default" /*className={classes.root}*/>
        <AppBar position="static">
          <Tabs
            /*className={classes.root}*/ value={value}
            onChange={handleChange}
          >
            <Tab label="Home" icon={<Home />} />
            <Tab label="Season" icon={<List />} />
            <Tab label="Schedule Season" icon={<PlaylistAdd />} />
            <Tab label="Play Game" icon={<PlayArrow />} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <HomePage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SeasonPage />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ScheduleSeasonForm />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <StartGameForm />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default App;
