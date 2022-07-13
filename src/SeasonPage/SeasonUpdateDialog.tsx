import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Season from "../Entity/Season";

interface SeasonControlsDialogProps {
  open: boolean;
  onClose: () => void;
  seasonId: number;
}

export default function SeasonUpdateDialog(props: SeasonControlsDialogProps) {
  const [summary, setSummary] = useState<string>();

  useEffect(() => {
    fetch(
      "http://192.168.68.129:8080/season/findById?seasonId=" + props.seasonId
    )
      .then((res) => res.json())
      .then((season) => {
        setSummary(season.summary);
      });
  }, [props.seasonId]);

  const handleCancel = () => {
    props.onClose();
  };

  const handleSubmit = () => {
    /* if (millisecondsPerTick !== props.millisecondsPerTick) {
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
        } */

    fetch(
      "http://192.168.68.129:8080/season/update?seasonId=" +
        props.seasonId +
        "&summary=" +
        summary
    );

    props.onClose();
  };

  const summaryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(event.target.value);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="form-dialog-title">Edit Season</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="summary"
          label="Summary"
          type="text"
          variant="outlined"
          multiline
          value={summary}
          fullWidth
          onChange={summaryOnChange}
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
