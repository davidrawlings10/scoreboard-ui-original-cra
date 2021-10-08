import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Game from "./Entity/Game";
/*import TickMilliInput from "./TickMilliInput";*/
import {
  Switch,
  Box,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Edit } from "@material-ui/icons";

export default function App() {
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);

  const [running, setRunning] = React.useState(false);
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);
  const [millisecondsPerTick, setMillisecondsPerTick] =
    React.useState<number>(0);

  /*const [tickMilli, setTickMilli] = React.useState<number>(1000);
  const [tickMilliUserTyping, setTickMilliUserTyping] =
    React.useState<boolean>(false);*/

  /*const [gamesToPlayTyping, setGamesToPlayTyping] =
    React.useState<boolean>(false);*/

  let timerId: any = null;

  function getScoreboardState() {
    fetch("http://localhost:8080/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        setRunning(json.running);
        /*console.log(
          "tickMilliUserTyping:" +
            tickMilliUserTyping +
            ", gamesToPlayTyping:" +
            gamesToPlayTyping
        );*/
        /*if (!tickMilliUserTyping) {
          setTickMilli(json.tickMilliseconds);
        }*/
        setMillisecondsPerTick(json.tickMilliseconds);
        /*if (!gamesToPlayTyping) {*/
        setGamesToPlay(json.gamesToPlay);
        /*}*/
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

  /*function updateGetScoreboardStateInterval() {
    fetch("http://localhost:8080/game/setTickMilliseconds?value=" + tickMilli);
    console.log(
      "updateGetScoreboardStateInterval() BEFORE - setTickMilliUserTyping:" +
        tickMilliUserTyping
    );
    // setTickMilliUserTyping(false);
    console.log(
      "updateGetScoreboardStateInterval() AFTER - setTickMilliUserTyping:" +
        tickMilliUserTyping
    );
  }

  function handleTickMilliInputChange(value: number) {
    clearGetScoreboardStateInterval();
    setTickMilli(value);
    console.log(
      "handleTickMilliInputChange() BEFORE - setTickMilliUserTyping:" +
        tickMilliUserTyping
    );
    setTickMilliUserTyping(true);
    console.log(
      "handleTickMilliInputChange() AFTER - setTickMilliUserTyping:" +
        tickMilliUserTyping
    );
  }*/

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (running) {
      fetch("http://localhost:8080/game/pauseGames");
    } else {
      fetch("http://localhost:8080/game/playGames");
    }
    setRunning(event.target.checked);
  };

  /*const handleGamesToPlayBlur = () => {
    fetch("http://localhost:8080/game/setGamesToPlay?numGames=" + gamesToPlay);
    console.log(
      "handleGamesToPlayBlur() BEFORE - gamesToPlayTyping:" + gamesToPlayTyping
    );
    // setGamesToPlayTyping(false);
    console.log(
      "handleGamesToPlayBlur() AFTER - gamesToPlayTyping:" + gamesToPlayTyping
    );
  };

  const handleGamesToPlayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGamesToPlay(parseInt(event.target.value));
    console.log(
      "handleGamesToPlayChange() BEFORE - gamesToPlayTyping:" +
        gamesToPlayTyping
    );
    setGamesToPlayTyping(true);
    console.log(
      "handleGamesToPlayChange() AFTER - gamesToPlayTyping:" + gamesToPlayTyping
    );
  };*/

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

  /*          <TickMilliInput
            updateGetGamesInterval={updateGetScoreboardStateInterval}
            tickMilli={tickMilli}
            handleTickMilliInputChange={handleTickMilliInputChange}
          />*/

  return (
    <div className="Home">
      <Box>
        <Box>
          <FormControlLabel
            control={
              <Switch checked={running} onChange={handleRunningChange} />
            }
            label="Playing"
            labelPlacement="start"
          />

          <FormControlLabel
            label="Milliseconds per tick"
            control={<input value={millisecondsPerTick} readOnly={true} />}
            labelPlacement="start"
          />
          <FormControlLabel
            label="Number of games to play"
            control={
              <>
                <input
                  /*onChange={handleGamesToPlayChange}
                  onBlur={handleGamesToPlayBlur}*/
                  value={gamesToPlay}
                  readOnly={true}
                />
              </>
            }
            labelPlacement="start"
          />
          <Button onClick={handleClickOpen} variant="contained" color="primary">
            <Edit />
          </Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Edit Scoreboard Controls
          </DialogTitle>
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
        <CurrentGameList
          games={
            currentGames != null && currentGames.length > 0
              ? currentGames
              : null
          }
          updateDisplayIndex={(index) => setDisplayGameIndex(index)}
        />
      </Box>
      <Scoreboard
        game={
          currentGames != null && currentGames.length > 0
            ? currentGames[displayGameIndex]
            : null
        }
      />
      <SeasonDisplay seasonId={currentGames[displayGameIndex]?.seasonId} />
      <div style={{ marginTop: 100 }}></div>
    </div>
  );
}
