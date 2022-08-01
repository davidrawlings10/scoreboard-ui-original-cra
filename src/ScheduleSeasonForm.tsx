import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import config from "./config";
import { getLeagueList } from "./Shared/LeagueHelper";
import Team from "./Entity/Team";

export type ScheduleSeasonFormProps = {};

export default function ScheduleSeasonForm(props: ScheduleSeasonFormProps) {
  const [leaguesT, setLeaguesT] = useState<Array<object>>();
  const [title, setTitle] = useState<string>("<Unnamed Season>");
  const [scheduleType, setScheduleType] = useState<string>(
    "HOME_ROTATION_RANDOM"
  );
  const [league, setLeague] = useState<string>("NHL");
  const [numGames, setNumGames] = useState<number>(4);
  const [showNumGamesInput, setShowNumGamesInput] = useState<boolean>(true);
  const [possibleTeams, setPossibleTeams] = useState<Array<Team>>([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState<Array<number>>([]);

  useEffect(() => {
    /*fetch(config.baseUrl + "/season/getLeagues")
      .then((res) => res.json())
      .then((json) => {
        setLeaguesT(json.list);
      });*/
    getLeagueList().then((list) => setLeaguesT(list));
  }, []);

  function titleChange(event: React.ChangeEvent<any>) {
    setTitle(event.target.value);
  }

  function scheduleTypeChange(event: React.ChangeEvent<any>) {
    setScheduleType(event.target.value);
  }

  function leagueChange(event: React.ChangeEvent<any>) {
    setLeague(event.target.value);
  }

  function numGamesChange(event: React.ChangeEvent<any>) {
    setNumGames(event.target.value);
  }

  function selectedTeamIdsChange(event: React.ChangeEvent<HTMLInputElement>) {
    // must perform push and splice on deep copy because it can't be performed on state array directly
    // let selectedTeamIdsCopy: Array<number> = selectedTeamIds.map((id) => id);
    if (event.target.checked) {
      setSelectedTeamIds(selectedTeamIds.concat(parseInt(event.target.value)));
    } else {
      setSelectedTeamIds(
        selectedTeamIds.filter((id) => id !== parseInt(event.target.value))
      );
    }
  }

  function handleSubmit(event: React.ChangeEvent<any>) {
    fetch(
      config.baseUrl +
        "/season/schedule?scheduleType=" +
        scheduleType +
        "&sport=HOCKEY" +
        "&league=" +
        league +
        "&teamIds=" +
        selectedTeamIds +
        "&numGames=" +
        numGames +
        "&title=" +
        title
    );
    event.preventDefault();
  }

  useEffect(() => {
    fetch(config.baseUrl + "/team/getTeams?league=" + league)
      .then((res) => res.json())
      .then((json) => {
        setPossibleTeams(json.list);
      });
  }, [league]);

  // hide number of games input unless schedule type is Rounds
  useEffect(() => {
    if (scheduleType === "ROUNDS") {
      setShowNumGamesInput(true);
    } else {
      setShowNumGamesInput(false);
    }
  }, [scheduleType]);

  return (
    <Box display="flex" justifyContent="center" width="100%" margin={2}>
      <Box width="85%">
        <form onSubmit={handleSubmit}>
          <Box>
            <Box margin={2}>
              <InputLabel>Season Title</InputLabel>
              <TextField
                value={title}
                onChange={titleChange}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box margin={2}>
              <InputLabel>League</InputLabel>
              <Select
                value={league}
                onChange={leagueChange}
                variant="outlined"
                fullWidth
              >
                {leaguesT &&
                  leaguesT.map((league: any) => (
                    <MenuItem id={league.value} value={league.value}>
                      {league.title}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
            <Box margin={2}>
              <InputLabel>Schedule Type</InputLabel>
              <Select
                value={scheduleType}
                onChange={scheduleTypeChange}
                variant="outlined"
                fullWidth
              >
                <MenuItem id="HOME_ROTATION" value="HOME_ROTATION">
                  Home Rotation
                </MenuItem>
                <MenuItem
                  id="HOME_ROTATION_RANDOM"
                  value="HOME_ROTATION_RANDOM"
                >
                  Home Rotation Random
                </MenuItem>
                <MenuItem id="ROUNDS" value="ROUNDS">
                  Rounds
                </MenuItem>
              </Select>
            </Box>
            {showNumGamesInput && (
              <Box margin={2}>
                <InputLabel>Number of Games per Team</InputLabel>
                <TextField
                  value={numGames}
                  onChange={numGamesChange}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            )}
          </Box>
          <Box paddingLeft={12} paddingRight={6}>
            <Box
              display="flex"
              flexDirection="column"
              flexWrap="wrap"
              justifyContent="start"
              height={360}
            >
              {possibleTeams.map((team) => (
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTeamIds.indexOf(team.id) >= 0}
                        onChange={selectedTeamIdsChange}
                        value={team.id}
                      />
                    }
                    label={
                      team.location
                        ? team.location + " " + team.name
                        : team.name
                    }
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button
              type="submit"
              value="Submit"
              variant="contained"
              color="primary"
            >
              Schedule Season
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
