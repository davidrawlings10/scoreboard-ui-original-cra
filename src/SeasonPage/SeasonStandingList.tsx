import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";

import "./Table.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Standing from "../Entity/Standing";

export type SeasonStandingListProps = {
  seasonId: number;
};

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);

  useEffect(() => {
    fetch("http://localhost:8080/standing/get?seasonId=" + props.seasonId)
      .then((res) => res.json())
      .then((standingsResult) => {
        setStandings(standingsResult.list);
      });
  }, [props.seasonId]);

  function calculatedPointPercentage(point: number, gp: number) {
    if (point === 0 || gp === 0) {
      return 0;
    }

    return ((point / (gp * 2)) * 100).toPrecision(3);
  }

  return (
    <Box
      marginTop={5}
      marginBottom={5}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <table className="season-standing-list">
        <thead>
          <tr>
            <th></th>
            <th>Team</th>
            <th title="Points">PTS</th>
            <th title="Games Played">GP</th>
            <th title="Win">W</th>
            <th title="Loss">L</th>
            <th title="Overtime Loss">OTL</th>
            <th title="Goals For">GF</th>
            <th title="Goals Against">GA</th>
            <th title="Goal Diff">GD</th>
            <th title="Home Points">HPTS</th>
            <th title="Home Games Played">HGP</th>
            <th title="Home Record">Home</th>
            <th title="Away Points">APTS</th>
            <th title="Away Games Played">AGP</th>
            <th title="Away Poinst">Away</th>
            <th title="Point Percentage">PP</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index: number) => (
            <tr key={standing.id}>
              <td>{index + 1}</td>
              <td>
                <TeamDisplay id={standing.teamId} />
              </td>
              <td>{standing.point}</td>
              <td>{standing.gp}</td>
              <td>{standing.win}</td>
              <td>{standing.loss}</td>
              <td>{standing.otloss}</td>
              <td>{standing.gf}</td>
              <td>{standing.ga}</td>
              <td>{standing.gf - standing.ga}</td>
              <td>{standing.homePoint}</td>
              <td>{standing.homeGp}</td>
              <td>
                {standing.homeWin}-{standing.homeLoss}-{standing.homeOtloss}
              </td>
              <td>{standing.awayPoint}</td>
              <td>{standing.awayGp}</td>
              <td>
                {standing.awayWin}-{standing.awayLoss}-{standing.awayOtloss}
              </td>
              <td>{calculatedPointPercentage(standing.point, standing.gp)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box className="tiebreaker">
        Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to head
        outcome, Two game playoff
      </Box>
    </Box>
  );
}
