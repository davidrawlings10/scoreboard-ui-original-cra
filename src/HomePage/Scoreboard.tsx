import React from "react";
import { Box, Grid, IconButton } from "@material-ui/core";
import {
  Delete as DeleteIcon /*, Edit as EditIcon*/,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import GameClockDisplay from "../Shared/GameClockDisplay";
import Game from "../Entity/Game";
import ConfirmationDialog from "./ConfirmationDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      cursor: "pointer",
    },
  },
}));

export type ScoreboardProps = {
  game: Game | null;
  small?: boolean;
};

export default function Scoreboard(props: ScoreboardProps) {
  const classes = useStyles();

  const [confirmationDailogOpen, setConfirmationDailogOpen] =
    React.useState(false);

  function terminateHandleClick() {
    setConfirmationDailogOpen(true);
  }

  const confirmationDialogHandleClose = (confirm: Boolean) => {
    setConfirmationDailogOpen(false);

    if (confirm) {
      if (!!props.game) {
        fetch(
          "http://192.168.1.71:8080/game/terminateCurrentGame?gameId=" +
            props.game.id
        );
      }
    }
  };

  /*function adjustHandleClick() {
    if (!!props.game) {
      fetch(
        "http://192.168.1.71:8080/game/adjustCurrentGame?gameId=" + props.game.id
      );
    }
  }*/

  if (!props.game) {
    return <div></div>;
  }

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box flexDirection="column">
          <Box
            bgcolor="primary.main"
            border="1px solid black"
            className={props.small ? classes.root : ""}
            width={props.small ? 200 : 360}
          >
            <Grid container>
              <Grid item xs={props.small ? 9 : 10}>
                <Box border="1px solid black" p={1}>
                  <TeamDisplay
                    id={props.game.homeTeamId}
                    hideLocation={props.small}
                  />
                </Box>
              </Grid>
              <Grid item xs={props.small ? 3 : 2}>
                <Box border="1px solid black" p={1} textAlign="center">
                  {props.game.homeScore}
                </Box>
              </Grid>
              <Grid item xs={props.small ? 9 : 10}>
                <Box border="1px solid black" p={1}>
                  <TeamDisplay
                    id={props.game.awayTeamId}
                    hideLocation={props.small}
                  />
                </Box>
              </Grid>
              <Grid item xs={props.small ? 3 : 2}>
                <Box border="1px solid black" p={1} textAlign="center">
                  {props.game.awayScore}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box border="1px solid black" p={1}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <GameClockDisplay game={props.game} />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box display={props.small ? "none" : "flex"}>
            <Box margin={0.5}>
              <IconButton size="small" onClick={terminateHandleClick}>
                <DeleteIcon />
              </IconButton>
            </Box>
            {/*<Box margin={0.5}>
              <IconButton size="small" onClick={adjustHandleClick}>
                <EditIcon />
              </IconButton>
            </Box>*/}
          </Box>
        </Box>
      </Box>
      <ConfirmationDialog
        open={confirmationDailogOpen}
        onClose={confirmationDialogHandleClose}
        game={props.game}
      />
    </>
  );
}
