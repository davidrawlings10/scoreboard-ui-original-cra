import {
  Box,
  Select,
  InputLabel,
  MenuItem,
  Input,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Team from "./Entity/Team";

export type ScheduleSeasonFormProps = {};

export default function ScheduleSeasonForm(props: ScheduleSeasonFormProps) {
  const [title, setTitle] = useState<string>("<Unnamed Season>");
  const [scheduleType, setScheduleType] = useState<string>("ROUNDS");
  const [sport, setSport] = useState<string>("HOCKEY");
  const [leagueId, setLeagueId] = useState<number>(2);
  const [numGames, setNumGames] = useState<number>(4);
  const [possibleTeams, setPossibleTeams] = useState<Array<Team>>([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState<Array<number>>([]);

  function titleChange(event: React.ChangeEvent<any>) {
    setTitle(event.target.value);
  }

  function scheduleTypeChange(event: React.ChangeEvent<any>) {
    setScheduleType(event.target.value);
  }

  function sportChange(event: React.ChangeEvent<any>) {
    setSport(event.target.value);
  }

  function leagueIdChange(event: React.ChangeEvent<any>) {
    setLeagueId(event.target.value);
  }

  function numGamesChange(event: React.ChangeEvent<any>) {
    setNumGames(event.target.value);
  }

  function selectedTeamIdsChange(event: React.ChangeEvent<HTMLInputElement>) {
    /*console.log("event.target.checked:   " + event.target.checked);
    console.log("event.target.value:     " + event.target.value);
    console.log("selectedTeamIds before: " + selectedTeamIds);*/

    // must perform push and splice on deep copy because it can't be performed on state array directly
    // let selectedTeamIdsCopy: Array<number> = selectedTeamIds.map((id) => id);
    if (event.target.checked) {
      // selectedTeamIdsCopy.push(parseInt(event.target.value));
      setSelectedTeamIds(selectedTeamIds.concat(parseInt(event.target.value)));
    } else {
      /*selectedTeamIdsCopy.splice(
        selectedTeamIds.indexOf(parseInt(event.target.value)),
        1
      );*/
      setSelectedTeamIds(
        selectedTeamIds.filter((id) => id !== parseInt(event.target.value))
      );
    }
    // setSelectedTeamIds(selectedTeamIdsCopy);

    /*console.log("selectedTeamIds after:  " + selectedTeamIds);
    console.log("selectedTeamIdsCopy after:  " + selectedTeamIdsCopy);*/
  }

  function handleSubmit(event: React.ChangeEvent<any>) {
    fetch(
      "http://192.168.68.129:8080/season/schedule?scheduleType=" +
        scheduleType +
        "&sport=" +
        sport +
        "&leagueId=" +
        leagueId +
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
    fetch("http://192.168.68.129:8080/team/getTeams?leagueId=" + leagueId)
      .then((res) => res.json())
      .then((json) => {
        setPossibleTeams(json.list);
        // setSelectedTeamIds(json.list.map((team: Team) => team.id));
      });
  }, [leagueId]);

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel>Season Title</InputLabel>
      <TextField value={title} onChange={titleChange} />
      <InputLabel>Schedule Type</InputLabel>
      <Select value={scheduleType} onChange={scheduleTypeChange}>
        <MenuItem id="HOME_ROTATION" value="HOME_ROTATION">
          Home Rotation
        </MenuItem>
        <MenuItem id="HOME_ROTATION_RANDOM" value="HOME_ROTATION_RANDOM">
          Home Rotation Random
        </MenuItem>
        <MenuItem id="ROUNDS" value="ROUNDS">
          Rounds
        </MenuItem>
      </Select>
      <InputLabel>Sport</InputLabel>
      <TextField value={sport} onChange={sportChange} />
      <InputLabel>League</InputLabel>
      <TextField value={leagueId} onChange={leagueIdChange} />
      <InputLabel>Number of Games</InputLabel>
      <TextField value={numGames} onChange={numGamesChange} />
      <Input type="submit" value="Submit" />
      <Box>
        <FormGroup>
          {possibleTeams.map((team) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedTeamIds.indexOf(team.id) >= 0}
                  onChange={selectedTeamIdsChange}
                  value={team.id}
                />
              }
              label={team.location + " " + team.name}
            />
          ))}
        </FormGroup>
      </Box>
    </form>
  );
}
