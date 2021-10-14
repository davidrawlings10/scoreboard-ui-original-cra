import { useState, useEffect } from "react";
import "./SeasonGameList.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Game from "../Entity/Game";
import { getFinalText } from "../Shared/ClockDisplay";
// import { getDateString } from "./DateUtil";

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
    <table className="SeasonGameList">
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
                  game.homeScore > game.awayScore ? "WinningTeamColor" : ""
                }
              >
                <TeamDisplay id={game.homeTeamId} />
              </td>
              <td
                className={
                  game.homeScore > game.awayScore ? "WinningTeamColor" : ""
                }
              >
                {game.homeScore}
              </td>
              <td
                className={
                  game.homeScore < game.awayScore ? "WinningTeamColor" : ""
                }
              >
                <TeamDisplay id={game.awayTeamId} />
              </td>
              <td
                className={
                  game.homeScore < game.awayScore ? "WinningTeamColor" : ""
                }
              >
                {game.awayScore}
              </td>
              <td>
                {game.status === "FINAL" ? getFinalText(game.endingPeriod) : ""}
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
  );
}
