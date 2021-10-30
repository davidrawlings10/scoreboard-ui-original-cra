import { useState, useEffect } from "react";
import { Select, InputLabel, MenuItem } from "@material-ui/core";

import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import Season from "../Entity/Season";

/*const useStyles = makeStyles({
  root: {
    color: "white",
  },
});*/

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);
  const [seasons, setSeasons] = useState(Array<Season>());

  function handleSeasonChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "seasonId") {
      setSeasonId(event.target.value);
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/season/getSeasons")
      .then((res) => res.json())
      .then((json) => {
        setSeasons(json.list);
        setSeasonId(json.list.length);
      });
  }, []);

  // const classes = useStyles();

  return (
    <div>
      <InputLabel id="labelSeason" /*className={classes.root}*/>
        Season
      </InputLabel>
      <Select
        labelId="label"
        id="selectSeason"
        name="seasonId"
        value={seasonId}
        onChange={handleSeasonChange}
        /*className={classes.root}*/
      >
        {seasons?.map((season) => (
          <MenuItem key={season.id} value={season.id}>
            {season.title}
          </MenuItem>
        ))}
      </Select>
      <SeasonList />
      <SeasonDisplay seasonId={seasonId} />
    </div>
  );
}
