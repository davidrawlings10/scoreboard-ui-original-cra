import React, { useState, useEffect } from "react";
import { Box, Button, FormControlLabel, Switch, Chip } from "@material-ui/core";
import { Settings } from "@material-ui/icons";

import config from "../config";

function getList(millisecondsPerTick: number) {
  let list = [100, 250, 500, 1000];
  if (!list.includes(millisecondsPerTick)) {
    list.push(millisecondsPerTick);
  }
  list.sort((a, b) => a - b);
  return list;
}

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
    <Box flexDirection="row">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Box>
          <FormControlLabel
            control={
              <Switch checked={props.running} onChange={handleRunningChange} />
            }
            label="Playing"
            labelPlacement="start"
          />
        </Box>
        {fullDisplay && (
          <>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box marginRight={1}>Milliseconds Per Tick</Box>
              <Box>
                {getList(millisecondsPerTick).map((milliseconds: number) => (
                  <Chip
                    label={milliseconds}
                    variant={
                      millisecondsPerTick === milliseconds
                        ? "default"
                        : "outlined"
                    }
                    color={
                      millisecondsPerTick === milliseconds
                        ? "primary"
                        : "default"
                    }
                    onClick={() => {
                      updateMillisecondsPerTick(milliseconds);
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box marginRight={1}>Number of Games to Play</Box>
              <Box>
                <Chip label={gamesToPlay} color="primary" />
              </Box>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Box marginRight={1}>Games Playing Concurrently</Box>
              <Box>
                <Chip label={gamesPlayingConcurrently} color="primary" />
              </Box>
            </Box>
          </>
        )}
        <Box>
          <Button
            onClick={handleScoreboardControlsDialogOpen}
            color="primary"
            variant="contained"
            startIcon={<Settings />}
          >
            Config
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
