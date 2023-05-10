import React, { useState, useEffect } from "react";
import { Box, Button, FormControlLabel, Switch, Chip } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

import config from "../config";

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

  const [fullDisplay, setFullDisplay] = useState<boolean>(true);

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const running: boolean = event.target.checked;
    props.handleRunningChange(running);
  };

  const handleScoreboardControlsDialogOpen = () => {
    props.handleScoreboardControlsDialogOpen();
  };

  const updateMillisecondsPerTick = (millisecondsPerTick: number) => {
    fetch(
      `${config.baseUrl}/game/setTickMilliseconds?value=${millisecondsPerTick}`
    );
  };

  useEffect(() => {
    setFullDisplay(window.innerWidth > 1200);
  }, [window.innerWidth]);

  return (
    <Box display="flex" alignItems="center">
      <Box marginRight={5}>
        <FormControlLabel
          control={
            <Switch checked={props.running} onChange={handleRunningChange} />
          }
          label="Playing"
          labelPlacement="start"
        />
      </Box>
      {fullDisplay && (
        <Box width={1200} display="flex">
          <Box
            width="25%"
            display="flex"
            justifyContent="right"
            alignContent="center"
            marginRight={2}
          >
            Milliseconds Per Tick
          </Box>
          <Box width="5%">{millisecondsPerTick}</Box>
          <Box width="15%" display="flex" alignContent="center">
            {[100, 250, 500, 1000].map((milliseconds) => (
              <Chip
                label={milliseconds}
                variant="outlined"
                color={
                  millisecondsPerTick === milliseconds ? "secondary" : "default"
                }
                onClick={() => {
                  updateMillisecondsPerTick(milliseconds);
                }}
              />
            ))}
          </Box>
          <Box
            width="25%"
            display="flex"
            justifyContent="right"
            alignContent="center"
            marginRight={2}
          >
            Number of Games to Play
          </Box>
          <Box width="5%">{gamesToPlay}</Box>
          <Box
            width="20%"
            display="flex"
            justifyContent="right"
            alignContent="center"
            marginRight={2}
          >
            Games Playing Concurrently
          </Box>
          <Box width="5%">{gamesPlayingConcurrently}</Box>
        </Box>
      )}
      <Button
        onClick={handleScoreboardControlsDialogOpen}
        color="primary"
        variant="contained"
        startIcon={<Settings />}
      >
        Config
      </Button>
    </Box>
  );
}
