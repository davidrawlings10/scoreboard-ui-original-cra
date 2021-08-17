import {
  Select,
  InputLabel,
  MenuItem,
  Input,
  TextField,
} from "@material-ui/core";
import { useState } from "react";

export type ScheduleSeasonFormProps = {};

export default function ScheduleSeasonForm(props: ScheduleSeasonFormProps) {
  const [title, setTitle] = useState<string>("Season 1");
  const [scheduleType, setScheduleType] = useState<string>("ROUNDS");
  const [sport, setSport] = useState<string>("HOCKEY");
  const [leagueId, setLeagueId] = useState<number>(2);
  const [numGames, setNumGames] = useState<number>(4);

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

  function handleSubmit(event: React.ChangeEvent<any>) {
    fetch(
      "http://localhost:8080/season/schedule?scheduleType=" +
        scheduleType +
        "&sport=" +
        sport +
        "&leagueId=" +
        leagueId +
        "&numGames=" +
        numGames +
        "&title=" +
        title
    );
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputLabel id="Number of Games">Season Title</InputLabel>
      <TextField value={title} onChange={titleChange} />
      <InputLabel id="Number of Games">Schedule Type</InputLabel>
      <TextField value={scheduleType} onChange={scheduleTypeChange} />
      <InputLabel id="Number of Games">Sport</InputLabel>
      <TextField value={sport} onChange={sportChange} />
      <InputLabel id="Number of Games">League</InputLabel>
      <TextField value={leagueId} onChange={leagueIdChange} />
      <InputLabel id="Number of Games">Number of Games</InputLabel>
      <TextField value={numGames} onChange={numGamesChange} />
      <Input type="submit" value="Submit" />
    </form>
  );
}
