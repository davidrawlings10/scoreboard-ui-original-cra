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

type SortDirection = "ASC" | "DESC";

export default function SeasonStandingList(props: SeasonStandingListProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);
  const [sortBy, setSortBy] = useState<string>("point");
  const [sortDirection, setSortDirection] = useState<SortDirection>("ASC");

  useEffect(() => {
    fetch(config.baseUrl + "/standing/get?seasonId=" + props.seasonId)
      .then((res) => res.json())
      .then((standingsResult) => {
        let standingsList: Standing[] = standingsResult.list;
        standingsList.forEach((standing: Standing) => {
          standing.goalDiff = standing.gf - standing.ga;
          standing.pointPercentage = calculatedPointPercentage(
            standing.point,
            standing.gp
          );
        });

        setStandings(standingsResult.list);
      });
  }, [props.seasonId, props.numGames?.current, props.numGames?.finished]);

  function calculatedPointPercentage(point: number, gp: number) {
    if (point === 0 || gp === 0) {
      return 0;
    }

    return ((point / (gp * 2)) * 100).toPrecision(3);
  }

  function updateSort(_sortBy: string) {
    if (sortBy === _sortBy) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(_sortBy);
      setSortDirection("ASC");
    }
  }

  interface ThProps {
    attribute: string;
    label: string;
    title: string;
  }

  function Th(props: ThProps) {
    const { attribute, label, title } = props;
    return (
      <th onClick={() => updateSort(attribute)} title={title}>
        {label}
      </th>
    );
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
            <Th attribute="point" label="PTS" title="Points" />
            <Th attribute="gp" label="GP" title="Games Played" />
            <th title="Games Played" onClick={() => updateSort("gp")}>
              GP
            </th>
            <th title="Win" onClick={() => updateSort("win")}>
              W
            </th>
            <th title="Loss" onClick={() => updateSort("loss")}>
              L
            </th>
            <th title="Overtime Loss" onClick={() => updateSort("otloss")}>
              OTL
            </th>
            <th title="Goals For" onClick={() => updateSort("gf")}>
              GF
            </th>
            <th title="Goals Against" onClick={() => updateSort("ga")}>
              GA
            </th>
            <th title="Goal Diff" onClick={() => updateSort("goalDiff")}>
              GD
            </th>
            <th title="Home Points" onClick={() => updateSort("homeGp")}>
              HPTS
            </th>
            <th title="Home Games Played" onClick={() => updateSort("homeGp")}>
              HGP
            </th>
            <th title="Home Record">Home</th>
            <th title="Away Points" onClick={() => updateSort("homeGp")}>
              APTS
            </th>
            <th title="Away Games Played" onClick={() => updateSort("awayGp")}>
              AGP
            </th>
            <th title="Away Points">Away</th>
            <th
              title="Point Percentage"
              onClick={() => updateSort("pointPercentage")}
            >
              PP
            </th>
          </tr>
        </thead>
        <tbody>
          {standings
            .sort((a: any, b: any) =>
              sortDirection === "ASC"
                ? b[sortBy] - a[sortBy]
                : a[sortBy] - b[sortBy]
            )
            .map((standing, index: number) => (
              <tr key={standing.id}>
                <td>{index + 1}</td>
                <td>
                  <TeamDisplay id={standing.teamId} />
                </td>
                <td>{standing.point}</td>
                <td>{standing.point}</td>
                <td>{standing.gp}</td>
                <td>{standing.win}</td>
                <td>{standing.loss}</td>
                <td>{standing.otloss}</td>
                <td>{standing.gf}</td>
                <td>{standing.ga}</td>
                <td>{standing.goalDiff}</td>
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
                <td>{standing.pointPercentage}%</td>
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
