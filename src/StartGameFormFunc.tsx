// keeping this as an example of a class component in tsx

import React, { useState, useEffect } from "react";
import { Button, Box } from "@material-ui/core";

import SimpleSelect from "./Shared/SimpleSelect";

interface StartGameFormFuncProps {}

export default function StartGameFormFunc(props: StartGameFormFuncProps) {
  const [homeLeague, setHomeLeague] = useState<string>("");
  const [awayLeague, setAwayLeague] = useState<string>("");

  function homeLeagueChange(league: string) {
    setHomeLeague(league);
  }

  function awayLeagueChange(league: string) {
    setAwayLeague(league);
  }

  /* loadTeams(league: string) {
    return fetch(config.baseUrl + "/team/getTeams?league=" + league)
      .then((res) => res.json())
      .then((json) => json.list);
  } */

  function handleSubmit(event: React.ChangeEvent<any>) {
    /* fetch(
      config.baseUrl +
        "/game/startSingleGame?sport=HOCKEY&homeTeamId=" +
        this.state.homeTeamId +
        "&awayTeamId=" +
        this.state.awayTeamId
    ); */
    event.preventDefault();
  }

  return (
    <Box display="flex" justifyContent="center" width="100%" margin={2}>
      <Box width={500}>
        <form onSubmit={handleSubmit}>
          <Box margin={2}>
            <SimpleSelect
              entity="league"
              value={homeLeague}
              onChange={homeLeagueChange}
            />
          </Box>
          <Box margin={2}>
            <SimpleSelect
              entity="league"
              value={awayLeague}
              onChange={awayLeagueChange}
            />
          </Box>
          <Box display="flex" justifyContent="end" margin={2}>
            <Button
              type="submit"
              value="Submit"
              variant="contained"
              color="primary"
            >
              Start Game
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
