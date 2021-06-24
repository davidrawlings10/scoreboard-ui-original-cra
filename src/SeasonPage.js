import { useState, useEffect } from "react";
import Season from "./Season";
import { Select, InputLabel, MenuItem } from "@material-ui/core";
import Button from "./Components/Button";

// this actually compiles okay, but the results didn't look acceptable in the ui.

export default function SeasonPage(props) {
  const [seasonId, setSeasonId] = useState(1);
  const [seasons, setSeasons] = useState([]);

  useEffect(() =>
    fetch("http://localhost:8080/season/getSeasons")
      .then((res) => res.json())
      .then((json) => setSeasons(json.list))
  );

  function scheduleNewSeason() {
    fetch(
      "http://localhost:8080/season/schedule?scheduleType=ROUNDS&sport=HOCKEY&leagueId=2&numGames=4"
    );
    /*fetch(
      "http://localhost:8080/season/schedule?scheduleType=HOME_ROTATION&sport=HOCKEY&leagueId=2"
    );*/
  }

  function handleSeasonChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    console.log("handleSeasonChange():" + value);

    if (name === "seasonId") {
      setSeasonId(value);
    }

    // this.setState({ [name]: value });
  }

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
      <Season seasonId={seasonId} />
    </div>
  );
}
