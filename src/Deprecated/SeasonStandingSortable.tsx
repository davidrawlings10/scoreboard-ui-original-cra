/*import React from "react";
import MaterialTable from "material-table";
import Standing from "../Entity/Standing";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

export type SeasonStandingProps = {
  seasonId: number;
};

export default function SeasonStanding(props: SeasonStandingProps) {
  const [standings, setStandings] = React.useState<Array<Standing>>([]);

  React.useEffect(() => {
    fetch("http://192.168.68.129:8080/standing/get?seasonId=" + props.seasonId)
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

  const columns = [
    {
      title: "Team",
      field: "teamId",
      render: (rowData: any) => (
        <div>
          <TeamDisplay id={rowData.teamId} />
        </div>
      ),
    },
    {
      title: "PTS",
      field: "point",
    },
    {
      title: "GP",
      field: "gp",
    },
    {
      title: "Win",
      field: "win",
    },
    {
      title: "Loss",
      field: "loss",
    },
    {
      title: "OTL",
      field: "otloss",
    },
    {
      title: "GF",
      field: "gf",
    },
    {
      title: "GA",
      field: "ga",
    },
    {
      title: "GD",
      field: "gf",
      render: (rowData: any) => rowData.gf - rowData.ga,
    },
    {
      title: "HPTS",
      field: "homePoint",
    },
    {
      title: "HGP",
      field: "homeGp",
    },
    {
      title: "HW",
      field: "homeWin",
    },
    {
      title: "HL",
      field: "homeLoss",
    },
    {
      title: "HOTL",
      field: "homeOtloss",
    },
    {
      title: "APTS",
      field: "awayPoint",
    },
    {
      title: "AGP",
      field: "awayGp",
    },
    {
      title: "AW",
      field: "awayWin",
    },
    {
      title: "AL",
      field: "awayLoss",
    },
    {
      title: "AOTL",
      field: "awayOtloss",
    },
    {
      title: "PP",
      field: "gf",
      render: (rowData: any) =>
        calculatedPointPercentage(rowData.point, rowData.gp) + "%",
    },
  ];

  return (
    <div>
      <MaterialTable
        title="Season Standing"
        data={standings}
        columns={columns}
        options={{
          search: true,
        }}
      />
      <div className="tiebreaker">
        Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to head
        outcome, Two game playoff
      </div>
    </div>
  );
}
*/

export {};
