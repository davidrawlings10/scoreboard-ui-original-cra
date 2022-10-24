import React from "react";
import { Box, Button, FormControlLabel, Switch } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

interface ScoreboardControlsProps {
  running: boolean;
  millisecondsPerTick: number;
  gamesToPlay: number;
  gamesPlayingConcurrently: number;
  handleRunningChange: any;
  handleScoreboardControlsDialogOpen: any;
}

export default function ScoreboardControls(props: ScoreboardControlsProps) {
  const { millisecondsPerTick, gamesToPlay, gamesPlayingConcurrently } = props;

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const running: boolean = event.target.checked;
    props.handleRunningChange(running);
  };

  const handleScoreboardControlsDialogOpen = () => {
    props.handleScoreboardControlsDialogOpen();
  };

  return (
    <Box display="flex" alignItems="center">
      <Box marginRight={8}>
        <FormControlLabel
          control={
            <Switch checked={props.running} onChange={handleRunningChange} />
          }
          label="Playing"
          labelPlacement="start"
        />
      </Box>
      <Box marginRight={3}>Milliseconds Per Tick</Box>
      <Box marginRight={8}>{millisecondsPerTick}</Box>
      <Box marginRight={3}>Number of Games to Play</Box>
      <Box marginRight={8}>{gamesToPlay}</Box>
      <Box marginRight={3}>Games Playing Concurrently</Box>
      <Box marginRight={8}>{gamesPlayingConcurrently}</Box>
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
