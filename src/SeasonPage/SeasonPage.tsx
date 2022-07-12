import { useState, useEffect } from "react";
import { Box, Select, InputLabel, MenuItem } from "@material-ui/core";

import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import SeasonHeader from "./SeasonHeader";
import Season from "../Entity/Season";

/*const useStyles = makeStyles({
  root: {
    color: "white",
  },
});*/

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);
  const [seasons, setSeasons] = useState(Array<Season>());
  const [season, setSeason] = useState<any>({});

  /*function handleSeasonChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "seasonId") {
      setSeasonId(event.target.value);
    }
  }*/

  function viewSeason(seasonId: number) {
    console.log("seasonId", seasonId);
    setSeasonId(seasonId);
  }

  useEffect(() => {
    fetch("http://192.168.1.71:8080/season/getSeasons")
      .then((res) => res.json())
      .then((json) => {
        setSeasons(json.list);
        setSeasonId(json.list.length);
      });
  }, []);

  useEffect(() => {
    fetch("http://192.168.1.71:8080/season/findById?seasonId=" + seasonId)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSeason(json);
      });
  }, [seasonId]);

  // const classes = useStyles();

  return (
    <Box padding={3} height="100%">
      <SeasonList viewSeason={viewSeason} />
      {/*<InputLabel id="labelSeason">
        Season
      </InputLabel>
      <Select
        labelId="label"
        id="selectSeason"
        name="seasonId"
        value={seasonId}
        onChange={handleSeasonChange}
        >
        {seasons?.map((season) => (
          <MenuItem key={season.id} value={season.id}>
            {season.title}
          </MenuItem>
        ))}
      </Select>*/}
      <Box marginBottom={4}>
        <SeasonHeader season={season} />
      </Box>
      <SeasonDisplay seasonId={seasonId} />
    </Box>
  );
}
