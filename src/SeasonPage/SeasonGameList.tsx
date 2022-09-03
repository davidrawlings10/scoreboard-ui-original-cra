import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import config from "../config";
import "./Table.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Game from "../Entity/Game";
import { getFinalText } from "../Shared/GameClockDisplay";
// import { getDateString } from "./DateUtil";

export type SeasonGameListProps = {
  seasonId: number;
};

export default function SeasonGameList(props: SeasonGameListProps) {
  const PAGE_SIZE = 20;

  const [games, setGames] = useState<Array<Game>>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetch(
      config.baseUrl +
        "/game/getGamesBySeasonId?seasonId=" +
        props.seasonId +
        "&page=" +
        page +
        "&pageSize=" +
        PAGE_SIZE
    )
      .then((res) => res.json())
      .then((gamesResult) => {
        setGames(gamesResult.list);
      });
    setPage(1);
  }, [props.seasonId]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Box
      marginTop={5}
      marginBottom={5}
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Box display="flex" m={1}>
        <Box>
          {games.filter((game) => game.endingPeriod != null).length} of{" "}
          {games.length} games played
        </Box>
        <Box>
          <Pagination
            onChange={handlePageChange}
            page={page}
            count={Math.floor((games.length - 1) / PAGE_SIZE + 1)}
          />
        </Box>
      </Box>
      <Box>
        <table className="season-game-list">
          <thead>
            <tr>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th></th>
              <th></th>
              <th>Played</th>
            </tr>
          </thead>
          <tbody>
            {games
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((game) => {
                return (
                  <tr key={game.id}>
                    <td
                      className={
                        game.homeScore > game.awayScore
                          ? "winning-team-color"
                          : ""
                      }
                    >
                      <TeamDisplay id={game.homeTeamId} />
                    </td>
                    <td
                      className={
                        game.homeScore > game.awayScore
                          ? "winning-team-color"
                          : ""
                      }
                    >
                      {game.homeScore}
                    </td>
                    <td
                      className={
                        game.homeScore < game.awayScore
                          ? "winning-team-color"
                          : ""
                      }
                    >
                      <TeamDisplay id={game.awayTeamId} />
                    </td>
                    <td
                      className={
                        game.homeScore < game.awayScore
                          ? "winning-team-color"
                          : ""
                      }
                    >
                      {game.awayScore}
                    </td>
                    <td>
                      {game.status === "FINAL"
                        ? getFinalText(game.endingPeriod)
                        : ""}
                    </td>
                    <td>
                      {/* new Date(1624854854000).toLocaleString("en-US", { timeZone: "America/Los_Angeles",}) 
                  this works but looks off 7 hours 

                  */
                      /*getDateString(
                    new Date(game.updated))*/
                      /*.toLocaleString("en-US", {
                    timeZone: "America/Chicago",
                  })*/}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
}
