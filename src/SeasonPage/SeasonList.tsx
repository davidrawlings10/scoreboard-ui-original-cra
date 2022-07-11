import { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";

import "./Table.css";
import Season from "../Entity/Season";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

export type SeasonListProps = { viewSeason: (seasonId: number) => void };

export default function SeasonList(props: SeasonListProps) {
  const [seasons, setSeasons] = useState<Array<Season>>([]);

  useEffect(() => {
    fetch("http://192.168.1.71:8080/season/getSeasons")
      .then((res) => res.json())
      .then((seasonsResult) => {
        setSeasons(seasonsResult.list);
      });
  }, []);

  // haven't quite got this working yet
  function viewSeason(event: any) {
    console.log(event);
    // props.viewSeason(id);
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <tr
              key={season.id}
              data-id={season.id}
              onClick={(e) => viewSeason(e)}
            >
              <td>{season.title}</td>
              <td>
                <TeamDisplay id={season.winnerTeamId} />
              </td>
              <td>{season.numTeams}</td>
              <td>{season.scheduleType}</td>
              <td>
                <Button size="small" onClick={(e) => viewSeason(e)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
