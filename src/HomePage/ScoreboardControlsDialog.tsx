import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

interface ScoreboardControlsDialogProps {
  open: boolean;
  onClose: () => void;
  gamesToPlay: number;
  millisecondsPerTick: number;
}

export default function ScoreboardControlsDialog(
  props: ScoreboardControlsDialogProps
) {
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(
    props.gamesToPlay
  );
  const [millisecondsPerTick, setMillisecondsPerTick] = React.useState<number>(
    props.millisecondsPerTick
  );

  const gamesToPlayInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGamesToPlay(parseInt(event.target.value));
  };

  const millisecondsPerTickOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMillisecondsPerTick(parseInt(event.target.value));
  };

  const handleCancel = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    if (millisecondsPerTick !== props.millisecondsPerTick) {
      setMillisecondsPerTick(millisecondsPerTick);
      fetch(
        "http://192.168.68.129:8080/game/setTickMilliseconds?value=" +
          millisecondsPerTick
      );
    }

    if (gamesToPlay !== props.gamesToPlay) {
      setGamesToPlay(gamesToPlay);
      fetch(
        "http://192.168.68.129:8080/game/setGamesToPlay?numGames=" + gamesToPlay
      );
    }

    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Edit Scoreboard Controls</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Set milliseconds per tick and number of games to play
        </DialogContentText>
        <TextField
          autoFocus
          id="tickMilliseconds"
          label="Tick Milliseconds"
          type="number"
          value={millisecondsPerTick}
          fullWidth
          onChange={millisecondsPerTickOnChange}
        />
        <TextField
          autoFocus
          id="gamesToPlay"
          label="Games to Play"
          type="number"
          value={gamesToPlay}
          fullWidth
          onChange={gamesToPlayInputOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
