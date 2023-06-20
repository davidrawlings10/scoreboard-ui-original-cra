import { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { AddToQueue } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import config from "../config";
import "../Shared/Table.css";
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
    fetch(config.baseUrl + "/season/getSeasons")
      .then((res) => res.json())
      .then((seasonsResult) => {
        setSeasons(seasonsResult.list);
      });
  }, []);

  function viewSeason(seasonId: number) {
    props.viewSeason(seasonId);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box marginBottom={2}>
        <table>
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
      <Box>
        <Button
          href={`${config.baseUrl}/season/getFullSQL`}
          color="primary"
          variant="contained"
          startIcon={<AddToQueue />}
        >
          Get Full Insert SQL
        </Button>
      </Box>
    </Box>
  );
}
