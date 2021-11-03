import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import styled from "styled-components";

import "./WinningTeamColor.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Game from "../Entity/Game";
import { getFinalText } from "../Shared/ClockDisplay";
// import { getDateString } from "./DateUtil";

const Table = styled.table`
  width: 50%;
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

export type SeasonGameListProps = {
  seasonId: number;
};

export default function SeasonGameList(props: SeasonGameListProps) {
  const [games, setGames] = useState<Array<Game>>([]);

  useEffect(() => {
    fetch(
      "http://localhost:8080/game/getGamesBySeasonId?seasonId=" + props.seasonId
    )
      .then((res) => res.json())
      .then((gamesResult) => {
        setGames(gamesResult.list);
      });
  }, [props.seasonId]);

  return (
    <Box marginTop={5} marginBottom={5} display="flex" justifyContent="center">
      <Table>
        <thead>
          <TrHeader>
            <Th>Home</Th>
            <Th></Th>
            <Th>Away</Th>
            <Th></Th>
            <Th></Th>
            <Th>Played</Th>
          </TrHeader>
        </thead>
        <tbody>
          {games.map((game) => {
            return (
              <Tr key={game.id}>
                <Td
                  className={
                    game.homeScore > game.awayScore ? "WinningTeamColor" : ""
                  }
                >
                  <TeamDisplay id={game.homeTeamId} />
                </Td>
                <Td
                  className={
                    game.homeScore > game.awayScore ? "WinningTeamColor" : ""
                  }
                >
                  {game.homeScore}
                </Td>
                <Td
                  className={
                    game.homeScore < game.awayScore ? "WinningTeamColor" : ""
                  }
                >
                  <TeamDisplay id={game.awayTeamId} />
                </Td>
                <Td
                  className={
                    game.homeScore < game.awayScore ? "WinningTeamColor" : ""
                  }
                >
                  {game.awayScore}
                </Td>
                <Td>
                  {game.status === "FINAL"
                    ? getFinalText(game.endingPeriod)
                    : ""}
                </Td>
                <Td>
                  {/* new Date(1624854854000).toLocaleString("en-US", { timeZone: "America/Los_Angeles",}) 
                  this works but looks off 7 hours 

                  */
                  /*getDateString(
                    new Date(game.updated))*/
                  /*.toLocaleString("en-US", {
                    timeZone: "America/Chicago",
                  })*/}
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
}
