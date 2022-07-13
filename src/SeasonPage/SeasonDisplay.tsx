import React from "react";
import { Box, Button, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import SeasonStanding from "./SeasonStandingList";
import SeasonGameList from "./SeasonGameList";
import SeasonUpdateDialog from "./SeasonUpdateDialog";

export type SeasonProps = {
  seasonId: number;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SeasonDisplay(props: SeasonProps) {
  const [gameStartedAlertOpen, setGameStartedAlertOpen] = React.useState(false);
  const [seasonUpdateDialogOpen, setSeasonUpdateDialogOpen] =
    React.useState(false);

  const handleGameStartedAlertClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSeasonUpdateDialogOpen(false);
  };

  function playSeasonGame() {
    setGameStartedAlertOpen(true);
    fetch(
      "http://192.168.68.129:8080/game/startSeasonGame?seasonId=" +
        props.seasonId
    );
  }

  function updateSeason() {
    setSeasonUpdateDialogOpen(true);
  }

  const handleSeasonUpdateDialogOpenClose = () => {
    setSeasonUpdateDialogOpen(false);
  };

  function deleteSeason() {
    console.log("not implemented");
  }

  if (!props.seasonId) {
    return <div></div>;
  }

  return (
    <div>
      <Snackbar
        open={gameStartedAlertOpen}
        autoHideDuration={1000}
        onClose={handleGameStartedAlertClose}
      >
        <Alert onClose={handleGameStartedAlertClose} severity="success">
          Game started
        </Alert>
      </Snackbar>
      <Box display="flex">
        <Box marginRight={1}>
          <Button onClick={playSeasonGame} color="primary" variant="contained">
            Play Next Game
          </Button>
        </Box>
        <Box marginRight={1}>
          <Button onClick={updateSeason} color="primary" variant="contained">
            Edit
          </Button>
        </Box>
        <Box marginRight={1}>
          <Button onClick={deleteSeason} color="secondary" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
      <SeasonStanding seasonId={props.seasonId} />
      <SeasonGameList seasonId={props.seasonId} />
      <SeasonUpdateDialog
        open={seasonUpdateDialogOpen}
        onClose={handleSeasonUpdateDialogOpenClose}
        seasonId={props.seasonId}
      />
    </div>
  );
}
