import { useState, useEffect } from "react";
import TeamDisplay from "./TeamDisplay";
import Standing from "./Entity/Standing";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
} from "@material-ui/data-grid";
import { Button } from "@material-ui/core";

export type SeasonStandingProps = {
  seasonId: number;
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "teamId",
    headerName: "Team",
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
    field: "point",
    headerName: "PTS",
    width: 150,
    editable: true,
  },
  {
    field: "win",
    headerName: "W",
    width: 150,
    editable: true,
  },
  {
    field: "loss",
    headerName: "L",
    width: 150,
    editable: true,
  },
  {
    field: "otloss",
    headerName: "OTL",
    width: 150,
    editable: true,
  },
  {
    field: "test",
    headerName: "Test",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => (
      <Button>{params.getValue(params.id, "teamId")}</Button>
    ),
    // <TeamDisplay id={params.getValue(params.id, "teamId")} />

    // `${f(params.getValue(params.id, "point"))}`,
    // `${params.getValue(params.id, "point") || ""}`,
  },
];

function f(x: any) {
  return x + "abc";
}

/*const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];*/

const rows = [{ id: 1, gp: "Snow", point: "abc" }];

/*const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];*/

export default function SeasonStanding(props: SeasonStandingProps) {
  const [standings, setStandings] = useState<Array<Standing>>([]);

  useEffect(() => {
    fetch("http://localhost:8080/standing/get?seasonId=" + props.seasonId)
      .then((res) => res.json())
      .then((standingsResult) => {
        setStandings(standingsResult.list);
      });
  }, [props.seasonId]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={standings}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
