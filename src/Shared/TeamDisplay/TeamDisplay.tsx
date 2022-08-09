import React from "react";

import config from "../../config";
import { searchCacheForTeam, cacheTeam } from "./TeamDisplayCache";
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
      }
    }
  }, [props.id]);

  return (
    <span>
      {props.hideLocation ? "" : team.location} {team.name}
    </span>
  );
}
