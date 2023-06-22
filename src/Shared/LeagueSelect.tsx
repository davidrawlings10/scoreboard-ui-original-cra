import { useState, useEffect } from "react";
import { Box, InputLabel, Select, MenuItem } from "@material-ui/core";

import { sfetchList } from "../sfetch";
import LeagueDisplay from "./LeagueDisplay/LeagueDisplay";

interface LeagueSelectProps {
  league: string | undefined;
  onChange: (league: string) => void;
}

export default function LeagueSelect(props: LeagueSelectProps) {
  const [leagues, setLeagues] = useState<Array<string>>();
  const [league, setLeague] = useState<string>("");

  // load list of leagues
  useEffect(() => {
    sfetchList("/season/getLeagues").then((list) => {
      setLeagues(list);
      setLeague(list[0]);
      props.onChange(list[0]);
    });
  }, []);

  function leagueChange(event: React.ChangeEvent<any>) {
    setLeague(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Box width={400}>
      <InputLabel>League</InputLabel>
      <Select
        value={league}
        onChange={leagueChange}
        variant="outlined"
        fullWidth
      >
        {leagues &&
          leagues.map((league: any) => (
            <MenuItem key={league} id={league} value={league}>
              <LeagueDisplay value={league} />
            </MenuItem>
          ))}
      </Select>
    </Box>
  );
}
