import React from "react";
import { Box, ThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import theme from "./theme";
import NavBar from "./NavBar";
import HomePage from "./HomePage/HomePage";
import SeasonPage from "./SeasonPage/SeasonPage";
import StartGameForm from "./StartGameForm";
import ScheduleSeasonForm from "./ScheduleSeasonForm";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background.default" color="text.primary">
        <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/season">
              <SeasonPage />
            </Route>
            <Route path="/scheduleSeason">
              <ScheduleSeasonForm />
            </Route>
            <Route path="/startGame">
              <StartGameForm />
            </Route>
          </Switch>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

export default App;
