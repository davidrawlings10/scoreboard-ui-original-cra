import React from "react";
import { Box } from "@material-ui/core";

import config from "../../config";
import { searchCacheForTeam, cacheTeam } from "./TeamNameCache";
import Team from "../../Entity/Team";

export interface TeamDisplayFuncProps {
  id: number;
  hideLocation?: boolean;
}

export default function TeamDisplayFunc(props: TeamDisplayFuncProps) {
  const [team, setTeam] = React.useState<Team>({
    id: -1,
    location: "",
    name: "",
  });
  const [displayText, setDisplayText] = React.useState<string>("");

  async function getTeamDisplay(id: number) {
    var res = await fetch(config.baseUrl + "/team/getTeamById?teamId=" + id);
    var team = await res.json();
    return team;
  }

  React.useEffect(() => {
    let team = searchCacheForTeam(props.id);

    if (!!team) {
      setTeam({ id: props.id, location: team.location, name: team.name });
    } else {
      if (!!props.id) {
        getTeamDisplay(props.id).then((team) => {
          setTeam({ id: props.id, location: team.location, name: team.name });
          cacheTeam(props.id, team);
        });
      } else {
        setTeam({ id: -1, location: "", name: "" });
      }
    }
  }, [props.id]);

  React.useEffect(() => {
    setDisplayText(
      `${props.hideLocation || team.location === null ? "" : team.location} ${
        team.name
      }`
    );
  }, [team, props.hideLocation]);

  return (
    <Box display="flex" flexDirection="row">
      {displayText}
    </Box>
  );
}
