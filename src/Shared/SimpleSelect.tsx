import { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  capitalize,
  FormControl,
} from "@material-ui/core";

import { sfetchList } from "../sfetch";
import LeagueDisplay from "./LeagueDisplay/LeagueDisplay";
import SportDisplay from "./SportDisplay/SportDisplay";

function getPath(entity: string) {
  switch (entity) {
    case "league":
      return "/season/getLeagues";
    case "sport":
      return "/season/getSports";
    default:
      throw Error("entity not allowed");
  }
}

interface EntityDisplayProps {
  entity: string;
  value: string;
}

function EntityDisplay({ entity, value }: EntityDisplayProps) {
  switch (entity) {
    case "league":
      return <LeagueDisplay value={value} />;
    case "sport":
      return <SportDisplay value={value} />;
    default:
      throw Error("entity not allowed");
  }
}

interface SimpleSelectProps {
  value: any | undefined;
  onChange: (value: any) => void;
  entity: string;
}

export default function SimpleSelect(props: SimpleSelectProps) {
  const [values, setValues] = useState<Array<any>>();
  const [value, setValue] = useState<any>(props.value);

  useEffect(() => {
    sfetchList(getPath(props.entity)).then((list) => {
      setValues(list);
      // setValue(list[0]);
      props.onChange(list[0]);
    });
  }, []);

  function valueChange(event: React.ChangeEvent<any>) {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }

  return (
    <Box>
      <FormControl>
        <InputLabel>{capitalize(props.entity)}</InputLabel>
        <Select
          value={value}
          onChange={valueChange}
          variant="outlined"
          fullWidth
          displayEmpty
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {values &&
            values.map((value: any) => (
              <MenuItem key={value} id={value} value={value}>
                <EntityDisplay value={value} entity={props.entity} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
