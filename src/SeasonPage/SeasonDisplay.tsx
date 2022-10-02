import React from "react";
import { Box, Button, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import config from "../config";
import SeasonStanding from "./SeasonStandingList";
import SeasonGameList from "./SeasonGameList";
import SeasonUpdateDialog from "./SeasonUpdateDialog";
import NextSeasonGame from "./NextSeasonGame";
import { PlayArrow, Edit, AddToQueue } from "@material-ui/icons";

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

  function updateSeason() {
    setSeasonUpdateDialogOpen(true);
  }

  const handleSeasonUpdateDialogOpenClose = () => {
    setSeasonUpdateDialogOpen(false);
  };

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
      <Box>
        <NextSeasonGame seasonId={props.seasonId} />
      </Box>
      <Box display="flex">
        <Box marginRight={1}>
          <Button
            onClick={updateSeason}
            color="primary"
            variant="contained"
            startIcon={<Edit />}
          >
            Edit
          </Button>
        </Box>
        <Box marginRight={1}>
          <Button
            onClick={() => {
              window.location.href = `http://localhost:8080/season/getSQL?seasonId=${props.seasonId}`;
            }}
            color="primary"
            variant="contained"
            startIcon={<AddToQueue />}
          >
            Get Insert SQL
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
