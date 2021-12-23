import React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

interface ScoreboardControlsProps {
  running: boolean;
  millisecondsPerTick: number;
  gamesToPlay: number;
  handleRunningChange: any;
  handleScoreboardControlsDialogOpen: any;
}

export default function ScoreboardControls(props: ScoreboardControlsProps) {
  const { millisecondsPerTick, gamesToPlay } = props;

  const [running, setRunning] = React.useState(props.running);

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const running: boolean = event.target.checked;
    props.handleRunningChange(running);
    setRunning(running);
  };

  const handleScoreboardControlsDialogOpen = () => {
    props.handleScoreboardControlsDialogOpen();
  };

  return (
    <Box display="flex">
      <Box marginRight={2}>
        <FormControlLabel
          control={<Switch checked={running} onChange={handleRunningChange} />}
          label="Playing"
          labelPlacement="start"
        />
      </Box>
      <Box marginRight={2}>
        <FormControlLabel
          label="Milliseconds per tick"
          control={
            <TextField
              value={millisecondsPerTick}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          }
          labelPlacement="start"
        />
      </Box>
      <Box marginRight={2}>
        <FormControlLabel
          label="Number of games to play"
          control={
            <>
              <TextField
                value={gamesToPlay}
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </>
          }
          labelPlacement="start"
        />
      </Box>
      <Button
        onClick={handleScoreboardControlsDialogOpen}
        color="primary"
        variant="contained"
        startIcon={<Edit />}
      >
        Edit
      </Button>
    </Box>
  );
}
