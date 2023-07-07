import { useState } from "react";

import { Box, InputLabel, Select, MenuItem } from "@material-ui/core";

import TeamDisplay from "./TeamDisplay/TeamDisplay";
import Team from "../Entity/Team";

interface TeamSelectProps {
  teamList: Array<Team>;
  onChange: (value: any) => void;
}

export default function TeamSelect(props: TeamSelectProps) {
  const [teamId, setTeamId] = useState<number | null>(null);

  function teamIdChange(event: React.ChangeEvent<any>) {
    setTeamId(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Box>
      <InputLabel id="labelHome">Team</InputLabel>
      <Select
        value={teamId}
        onChange={teamIdChange}
        variant="outlined"
        fullWidth
      >
        {props.teamList.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            <TeamDisplay id={team.id} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
