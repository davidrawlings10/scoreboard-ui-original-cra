import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import SeasonStanding from "./SeasonStanding";
import SeasonGameList from "./SeasonGameList";
import SeasonStandingSortable from "./SeasonStandingSortable";
import SeasonGameListSortable from "./SeasonGameListSortable";
import Button from "../Components/Button";
import "./SeasonDisplay.css";

export type SeasonProps = {
  seasonId: number;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SeasonDisplay(props: SeasonProps) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function playSeasonGame() {
    setOpen(true);
    fetch(
      "http://localhost:8080/game/startSeasonGame?seasonId=" + props.seasonId
    );
  }

  if (!props.seasonId) {
    return <div></div>;
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Game started
        </Alert>
      </Snackbar>      
      <Button onClick={playSeasonGame}>Play Next Game</Button>
      <SeasonStanding seasonId={props.seasonId} />
      <SeasonGameList seasonId={props.seasonId} />
    </div>
  );
}
