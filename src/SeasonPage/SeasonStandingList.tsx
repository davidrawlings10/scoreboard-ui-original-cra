import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";

import config from "../config";
import "./Table.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Standing from "../Entity/Standing";

// import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

// const divCom = <div>abc</div>;
// const teamDisplay = <TeamDisplay id={2} />;

/*const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "point",
    headerName: "PTS",
    width: 150,
    editable: true,
  },
  {
    field: "gp",
    headerName: "GP",
    width: 150,
    editable: true,
  },
  {
    field: "ptsgp",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "point") || ""} ${
        params.getValue(params.id, "gp") || ""
      }`,
  },
  {
    field: "team",
    headerName: "Team",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => {
      // const teamDisplay = <TeamDisplay id={2} />;
      return JSON.stringify(teamDisplay);
    },
  },
];*/

/*const rows = [
  { id: 1, point: 3, gp: 2 },
  { id: 2, point: 2, gp: 2 },
  { id: 3, point: 1, gp: 2 },
];*/

export type SeasonStandingListProps = {
  seasonId: number;
  numGames: { current: number; finished: number } | null;
};

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);

  useEffect(() => {
    fetch(config.baseUrl + "/standing/get?seasonId=" + props.seasonId)
      .then((res) => res.json())
      .then((standingsResult) => {
        setStandings(standingsResult.list);
      });
  }, [props.seasonId, props.numGames?.current, props.numGames?.finished]);

  function calculatedPointPercentage(point: number, gp: number) {
    if (point === 0 || gp === 0) {
      return 0;
    }

    return ((point / (gp * 2)) * 100).toPrecision(3);
  }

  return (
    <Box
      marginTop={5}
      marginBottom={5}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <table className="season-standing-list">
        <thead>
          <tr>
            <th></th>
            <th>Team</th>
            <th title="Points">PTS</th>
            <th title="Games Played">GP</th>
            <th title="W-L-OT">Record</th>
            <th title="Goals For">GF</th>
            <th title="Goals Against">GA</th>
            <th title="Goal Diff">GD</th>
            <th title="Home Points">HPTS</th>
            <th title="Home Games Played">HGP</th>
            <th title="Home Record">Home</th>
            <th title="Away Points">APTS</th>
            <th title="Away Games Played">AGP</th>
            <th title="Away Poinst">Away</th>
            <th title="Point Percentage">PP</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index: number) => (
            <tr key={standing.id}>
              <td>{index + 1}</td>
              <td>
                <TeamDisplay id={standing.teamId} />
              </td>
              <td>{standing.point}</td>
              <td>{standing.gp}</td>
              <td>
                {standing.win}-{standing.loss}-{standing.otloss}
              </td>
              <td>{standing.gf}</td>
              <td>{standing.ga}</td>
              <td>{standing.gf - standing.ga}</td>
              <td>{standing.homePoint}</td>
              <td>{standing.homeGp}</td>
              <td>
                {standing.homeWin}-{standing.homeLoss}-{standing.homeOtloss}
              </td>
              <td>{standing.awayPoint}</td>
              <td>{standing.awayGp}</td>
              <td>
                {standing.awayWin}-{standing.awayLoss}-{standing.awayOtloss}
              </td>
              <td>{calculatedPointPercentage(standing.point, standing.gp)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box>
        Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to head
        outcome, Two game playoff
      </Box>
      {/*<Box height={400} width="100%">
        <DataGrid
          rows={standings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>*/}
    </Box>
  );
}
