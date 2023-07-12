import { useState } from "react";

import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";

import TeamDisplay from "./TeamDisplay/TeamDisplay";
import Team from "../Entity/Team";

interface TeamSelectProps {
  value: string;
  list: Array<Team>;
  onChange: (value: any) => void;
}

export default function TeamSelect(props: TeamSelectProps) {
  const [teamId, setTeamId] = useState<string>(props.value);

  function teamIdChange(event: React.ChangeEvent<any>) {
    setTeamId(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Box>
      <FormControl>
        <InputLabel id="labelHome">Team</InputLabel>
        <Select
          value={teamId}
          onChange={teamIdChange}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {props.list.map((team) => (
            <MenuItem key={team.id} value={team.id}>
              <TeamDisplay id={team.id} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
