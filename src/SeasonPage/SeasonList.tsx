import { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import styled from "styled-components";

import Season from "../Entity/Season";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

const Table = styled.table`
  width: 80%;
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

export type SeasonListProps = {};

export default function SeasonList(props: SeasonListProps) {
  const [seasons, setSeasons] = useState<Array<Season>>([]);

  useEffect(() => {
    fetch("http://localhost:8080/season/getSeasons")
      .then((res) => res.json())
      .then((seasonsResult) => {
        setSeasons(seasonsResult.list);
      });
  });

  return (
    <Box marginTop={5} marginBottom={5} display="flex" justifyContent="center">
      <Table>
        <thead>
          <TrHeader>
            <Th>Name</Th>
            <Th>Winner</Th>
            <Th>Teams</Th>
            <Th>Schedule</Th>
            <Th></Th>
          </TrHeader>
        </thead>
        <tbody>
          {seasons.map((season) => (
            <Tr key={season.id}>
              <Td>{season.title}</Td>
              <Td>
                <TeamDisplay id={season.winnerTeamId} />
              </Td>
              <Td>{season.numTeams}</Td>
              <Td>{season.scheduleType}</Td>
              <Td>
                <Button size="small">View</Button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
