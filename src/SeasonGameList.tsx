import { useState, useEffect } from "react";
import "./SeasonGameList.css";
import TeamDisplay from "./TeamDisplay";
import Game from "./Domain/Game";
import { getFinalText } from "./ClockDisplay";

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
          <th>Period</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
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
            <td>{getFinalText(game.endingPeriod)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
