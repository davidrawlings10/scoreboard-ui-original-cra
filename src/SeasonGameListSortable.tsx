import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "./SeasonGameList.css";
import TeamDisplay from "./TeamDisplay";
import Game from "./Entity/Game";
import { getFinalText } from "./ClockDisplay";
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

  const columns = [
    {
      title: "Home",
      field: "homeTeamId",
      render: (rowData: any) => (
        <div>
          <TeamDisplay id={rowData.homeTeamId} />
        </div>
      ),
    },
    {
      title: "",
      field: "homeScore",
    },
    {
      title: "Away",
      field: "awayTeamId",
      render: (rowData: any) => (
        <div>
          <TeamDisplay id={rowData.awayTeamId} />
        </div>
      ),
    },
    {
      title: "",
      field: "awayScore",
    },
    {
      title: "",
      field: "endingPeriod",
    },
  ];

  return (
    <div>
      <MaterialTable
        title="Season Games"
        data={games}
        columns={columns}
        options={{
          search: true,
          filtering: true,
        }}
      />
    </div>
  );

  /*return (
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
                date
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );*/
}
