import { useState, useEffect } from "react";
import "./SeasonGameList.css";
import TeamDisplay from "./TeamDisplay";
import Game from "./Game";

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
  });

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
            <td>
              <TeamDisplay id={game.homeTeamId} />
            </td>
            <td>{game.homeScore}</td>
            <td>
              <TeamDisplay id={game.awayTeamId} />
            </td>
            <td>{game.awayScore}</td>
            <td>{game.endingPeriod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
