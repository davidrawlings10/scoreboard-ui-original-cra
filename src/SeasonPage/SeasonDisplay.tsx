import React from "react";
import { Button, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import SeasonStanding from "./SeasonStandingList";
import SeasonGameList from "./SeasonGameList";

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
      "http://192.168.1.71:8080/game/startSeasonGame?seasonId=" + props.seasonId
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
      <Button onClick={playSeasonGame} color="primary" variant="contained">
        Play Next Game
      </Button>
      <SeasonStanding seasonId={props.seasonId} />
      <SeasonGameList seasonId={props.seasonId} />
    </div>
  );
}
