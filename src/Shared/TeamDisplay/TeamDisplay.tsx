import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import config from "../../config";
import { searchCacheForTeam, cacheTeam } from "./TeamDisplayCache";
import Team from "../../Entity/Team";
import theme from "../../theme";

const useStyles = makeStyles({
  linkText: {
    color: theme.palette.text.primary,
    textDecoration: "none",
  },
});

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

  const classes = useStyles();

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

  return (
    <Link to={`/teams/${props.id}`} className={classes.linkText}>
      <span>
        {props.hideLocation ? "" : team.location} {team.name}
      </span>
    </Link>
  );
}
