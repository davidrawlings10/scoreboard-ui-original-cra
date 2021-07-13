import { useState, useEffect } from "react";
import SeasonDisplay from "./SeasonDisplay";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import Button from "./Components/Button";
import Season from "./Entity/Season";

// this actually compiles okay, but the results didn't look acceptable in the ui.

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);
  const [seasons, setSeasons] = useState(Array<Season>());

  function scheduleNewSeason() {
    fetch(
      "http://localhost:8080/season/schedule?scheduleType=ROUNDS&sport=HOCKEY&leagueId=2&numGames=4"
    );
    /*fetch(
      "http://localhost:8080/season/schedule?scheduleType=HOME_ROTATION&sport=HOCKEY&leagueId=2"
    );*/
  }

  function handleSeasonChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "seasonId") {
      setSeasonId(event.target.value);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/season/getSeasons")
      .then((res) => res.json())
      .then((json) => setSeasons(json.list));
  });

  return (
    <div>
      <Button onClick={scheduleNewSeason}>Schedule New Season</Button>
      <InputLabel id="labelSeason">Season</InputLabel>
      <Select
        labelId="label"
        id="selectSeason"
        name="seasonId"
        value={seasonId}
        onChange={handleSeasonChange}
      >
        {seasons?.map((season) => (
          <MenuItem value={season.id}>{season.title}</MenuItem>
        ))}
      </Select>
      <SeasonDisplay seasonId={seasonId} />
    </div>
  );
}
