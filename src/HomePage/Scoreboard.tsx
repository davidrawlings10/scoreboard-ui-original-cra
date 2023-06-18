import React from "react";
import { Box, IconButton } from "@material-ui/core";
import {
  Delete as DeleteIcon /*, Edit as EditIcon*/,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import config from "../config";
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

interface ScoreboardRowProps {
  teamId: number;
  score: number;
  small?: boolean;
}

function ScoreboardRow({ teamId, score, small }: ScoreboardRowProps) {
  return (
    <Box display="flex" flexDirection="row">
      <Box border="1px solid black" p={1} width="85%">
        <TeamDisplay id={teamId} hideLocation={small} />
      </Box>
      <Box
        border="1px solid black"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={1}
        width="15%"
      >
        {score}
      </Box>
    </Box>
  );
}

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
          config.baseUrl + "/game/terminateCurrentGame?gameId=" + props.game.id
        );
      }
    }
  };

  if (!props.game) {
    return <div></div>;
  }

  return (
    <>
      <Box display="flex">
        <Box flexDirection="column">
          <Box
            bgcolor="primary.main"
            border="1px solid black"
            className={props.small ? classes.root : ""}
            width={props.small ? 260 : 380}
          >
            <ScoreboardRow
              teamId={props.game.homeTeamId}
              score={props.game.homeScore}
              small={props.small}
            />
            <ScoreboardRow
              teamId={props.game.awayTeamId}
              score={props.game.awayScore}
              small={props.small}
            />
            <Box border="1px solid black" p={1}>
              <Box display="flex" flexDirection="row">
                <GameClockDisplay game={props.game} />
              </Box>
            </Box>
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
