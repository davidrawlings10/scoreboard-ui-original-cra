import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";

import "./Table.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Game from "../Entity/Game";
import { getFinalText } from "../Shared/GameClockDisplay";
// import { getDateString } from "./DateUtil";

export type SeasonGameListProps = {
  seasonId: number;
};

export default function SeasonGameList(props: SeasonGameListProps) {
  const [games, setGames] = useState<Array<Game>>([]);

  useEffect(() => {
    fetch(
      "http://192.168.1.71:8080/game/getGamesBySeasonId?seasonId=" + props.seasonId
    )
      .then((res) => res.json())
      .then((gamesResult) => {
        setGames(gamesResult.list);
      });
  }, [props.seasonId]);

  return (
    <>
      <Box
        marginTop={5}
        marginBottom={5}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box>
          {games.filter((game) => game.endingPeriod != null).length} of{" "}
          {games.length} games played
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
              {games.map((game) => {
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
    </>
  );
}
