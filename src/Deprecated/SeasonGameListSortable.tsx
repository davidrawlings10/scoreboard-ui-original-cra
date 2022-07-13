/*import { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "./SeasonGameList.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Game from "../Entity/Game";

export type SeasonGameListProps = {
  seasonId: number;
};

export default function SeasonGameList(props: SeasonGameListProps) {
  const [games, setGames] = useState<Array<Game>>([]);

  useEffect(() => {
    fetch(
      "http://192.168.68.129:8080/game/getGamesBySeasonId?seasonId=" + props.seasonId
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
}
*/
export {};
