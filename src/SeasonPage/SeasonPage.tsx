import { useState, useEffect } from "react";
import { Box, Select, InputLabel, MenuItem } from "@material-ui/core";

import SeasonList from "./SeasonList";
import SeasonDisplay from "./SeasonDisplay";
import Season from "../Entity/Season";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

/*const useStyles = makeStyles({
  root: {
    color: "white",
  },
});*/

export default function SeasonPage() {
  const [seasonId, setSeasonId] = useState(1);
  const [seasons, setSeasons] = useState(Array<Season>());
  const [season, setSeason] = useState<any>({});

  function handleSeasonChange(event: React.ChangeEvent<any>) {
    if ((event.target.name as string) === "seasonId") {
      setSeasonId(event.target.value);
    }
  }

  function viewSeason(seasonId: number) {
    setSeasonId(seasonId);
  }

  useEffect(() => {
    fetch("http://localhost:8080/season/getSeasons")
      .then((res) => res.json())
      .then((json) => {
        setSeasons(json.list);
        setSeasonId(json.list.length);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/season/findById?seasonId=" + seasonId)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setSeason(json);
      });
  }, [seasonId]);

  // const classes = useStyles();

  return (
    <Box height="100%">
      <SeasonList viewSeason={viewSeason} />
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
      <Box marginTop={2} marginBottom={2} padding={1} border="1px solid black">
        <Box padding={1} display="flex">
          <Box margin={1}>
            <h1>{season.title}</h1>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box
              margin={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Winner</Box>
              <TeamDisplay id={season.winnerTeamId} />
            </Box>
            <Box
              margin={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Number of Teams</Box>
              <Box>{season.numTeams}</Box>
            </Box>
            <Box
              margin={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>Schedule</Box>
              {season.scheduleType}
            </Box>
            <Box
              margin={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box>League Id</Box>
              <Box>{season.leagueId}</Box>
            </Box>
          </Box>
        </Box>
        <Box
          border="1px solid black"
          marginTop={1}
          marginBottom={2}
          padding={1}
        >
          {season.summary}
        </Box>
      </Box>
      <SeasonDisplay seasonId={seasonId} />
    </Box>
  );
}
