import React from "react";
import {
  Switch,
  Box,
  FormControlLabel,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Game from "./Entity/Game";

export default function App() {
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);

  const [running, setRunning] = React.useState(false);
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);
  const [millisecondsPerTick, setMillisecondsPerTick] =
    React.useState<number>(0);

  let timerId: any = null;

  function getScoreboardState() {
    fetch("http://localhost:8080/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        setRunning(json.running);
        setMillisecondsPerTick(json.tickMilliseconds);
        setGamesToPlay(json.gamesToPlay);
      });
  }

  React.useEffect(() => {
    setGetScoreboardStateInterval(millisecondsPerTick);
    return function cleanup() {
      if (!!timerId) {
        clearGetScoreboardStateInterval();
      }
    };
  }, [millisecondsPerTick]);

  function setGetScoreboardStateInterval(milliseconds: number) {
    timerId = setInterval(
      () => getScoreboardState(),
      Math.max(milliseconds, 200)
    );
  }

  function clearGetScoreboardStateInterval() {
    clearInterval(timerId);
    timerId = null;
  }

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (running) {
      fetch("http://localhost:8080/game/pauseGames");
    } else {
      fetch("http://localhost:8080/game/playGames");
    }
    setRunning(event.target.checked);
  };

  const [open, setOpen] = React.useState(false);
  const [gamesToPlayInput, setGamesToPlayInput] = React.useState<number>(0);
  const [millisecondsPerTickInput, setMillisecondsPerTickInput] =
    React.useState<number>(0);

  const handleClickOpen = () => {
    setGamesToPlayInput(gamesToPlay);
    setMillisecondsPerTickInput(millisecondsPerTick);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (millisecondsPerTick !== millisecondsPerTickInput) {
      setMillisecondsPerTick(millisecondsPerTickInput);
      fetch(
        "http://localhost:8080/game/setTickMilliseconds?value=" +
          millisecondsPerTickInput
      );
    }

    if (gamesToPlay !== gamesToPlayInput) {
      setGamesToPlay(gamesToPlayInput);
      fetch(
        "http://localhost:8080/game/setGamesToPlay?numGames=" + gamesToPlayInput
      );
    }

    setOpen(false);
  };

  const gamesToPlayInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGamesToPlayInput(parseInt(event.target.value));
  };

  const millisecondsPerTickInputOnChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMillisecondsPerTickInput(parseInt(event.target.value));
  };

  const ScoreboardControlsDialog = (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
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
          value={millisecondsPerTickInput}
          fullWidth
          onChange={millisecondsPerTickInputOnChange}
        />
        <TextField
          autoFocus
          id="gamesToPlay"
          label="Games to Play"
          type="number"
          value={gamesToPlayInput}
          fullWidth
          onChange={gamesToPlayInputOnChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Box display="flex">
        <Box>
          <FormControlLabel
            control={
              <Switch checked={running} onChange={handleRunningChange} />
            }
            label="Playing"
            labelPlacement="start"
          />
        </Box>
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
        <IconButton onClick={handleClickOpen} color="primary">
          <Edit />
        </IconButton>
        {ScoreboardControlsDialog}
      </Box>
      <CurrentGameList
        games={
          currentGames != null && currentGames.length > 0 ? currentGames : null
        }
        updateDisplayIndex={(index) => setDisplayGameIndex(index)}
      />
      <Scoreboard
        game={
          currentGames != null && currentGames.length > 0
            ? currentGames[displayGameIndex]
            : null
        }
      />
      <SeasonDisplay seasonId={currentGames[displayGameIndex]?.seasonId} />
    </Box>
  );
}
