import { useState, useEffect } from "react";
import styled from "styled-components";
// import "./SeasonStanding.css";

import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Standing from "../Entity/Standing";
import { Box } from "@material-ui/core";
// import { AddBoxOutlined } from "@material-ui/icons";

const Table = styled.table`
  width: 100%;
  text-align: left;
  border: 1px solid black;
`;

const TrHeader = styled.tr`
  background-color: #aac;
`;

const Tr = styled.tr`
  background-color: #cce;
  &:hover {
    background-color: #aac;
  }
`;

const Th = styled.th`
  padding: 5px 10px 5px 10px;
`;

const Td = styled.td`
  padding: 1px 10px 1px 10px;
`;

export type SeasonStandingProps = {
  seasonId: number;
};

export default function SeasonStanding(props: SeasonStandingProps) {
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
      <Table>
        <thead>
          <TrHeader>
            <Th></Th>
            <Th>Team</Th>
            <Th title="Points">PTS</Th>
            <Th title="Games Played">GP</Th>
            <Th title="Win">W</Th>
            <Th title="Loss">L</Th>
            <Th title="Overtime Loss">OTL</Th>
            <Th title="Goals For">GF</Th>
            <Th title="Goals Against">GA</Th>
            <Th title="Goal Diff">GD</Th>
            <Th title="Home Points">HPTS</Th>
            <Th title="Home Games Played">HGP</Th>
            <Th title="Home Record">Home</Th>
            <Th title="Away Points">APTS</Th>
            <Th title="Away Games Played">AGP</Th>
            <Th title="Away Poinst">Away</Th>
            <Th title="Point Percentage">PP</Th>
          </TrHeader>
        </thead>
        <tbody>
          {standings.map((standing, index: number) => (
            <Tr key={standing.id}>
              <Td>{index + 1}</Td>
              <Td>
                <TeamDisplay id={standing.teamId} />
              </Td>
              <Td>{standing.point}</Td>
              <Td>{standing.gp}</Td>
              <Td>{standing.win}</Td>
              <Td>{standing.loss}</Td>
              <Td>{standing.otloss}</Td>
              <Td>{standing.gf}</Td>
              <Td>{standing.ga}</Td>
              <Td>{standing.gf - standing.ga}</Td>
              <Td>{standing.homePoint}</Td>
              <Td>{standing.homeGp}</Td>
              <Td>
                {standing.homeWin}-{standing.homeLoss}-{standing.homeOtloss}
              </Td>
              <Td>{standing.awayPoint}</Td>
              <Td>{standing.awayGp}</Td>
              <Td>
                {standing.awayWin}-{standing.awayLoss}-{standing.awayOtloss}
              </Td>
              <Td>{calculatedPointPercentage(standing.point, standing.gp)}%</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Box className="tiebreaker">
        Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to head
        outcome, Two game playoff
      </Box>
    </Box>
  );
}
