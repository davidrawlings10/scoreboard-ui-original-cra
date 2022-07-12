import { useState, useEffect } from "react";
import { Box} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import "./Table.css";
import Season from "../Entity/Season";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

export type SeasonListProps = { viewSeason: (seasonId: number) => void };

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function SeasonList(props: SeasonListProps) {
  const classes = useStyles();

  const [seasons, setSeasons] = useState<Array<Season>>([]);

  useEffect(() => {
    fetch("http://192.168.1.71:8080/season/getSeasons")
      .then((res) => res.json())
      .then((seasonsResult) => {
        setSeasons(seasonsResult.list);
      });
  }, []);

  function viewSeason(seasonId: number) {
    props.viewSeason(seasonId);
  }

  return (
    <Box marginTop={5} marginBottom={5} display="flex" justifyContent="center">
      <table className="season-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Winner</th>
            <th>Teams</th>
            <th>Schedule</th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr
              key={season.id}
              onClick={() => viewSeason(season.id)}
              className={classes.root}
            >
              <td>{season.title}</td>
              <td>
                <TeamDisplay id={season.winnerTeamId} />
              </td>
              <td>{season.numTeams}</td>
              <td>{season.scheduleType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
