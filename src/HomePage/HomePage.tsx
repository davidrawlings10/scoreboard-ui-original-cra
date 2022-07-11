import React from "react";
import {
  Switch,
  Box,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";

import Scoreboard from "./Scoreboard";
import ScoreboardControlsDialog from "./ScoreboardControlsDialog";
import SeasonDisplay from "../SeasonPage/SeasonDisplay";
import Game from "../Entity/Game";
import GameEvent from "../Entity/GameEvent";
import GameEventList from "./GameEventList";
import ScoreboardControls from "./ScoreboardControls";

export default function HomePage() {
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);
  const [gameEvents, setGameEvents] = React.useState(Array<GameEvent>());

  const [running, setRunning] = React.useState(false);
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);
  const [millisecondsPerTick, setMillisecondsPerTick] =
    React.useState<number>(0);

  let timerId: any = null;

  function getScoreboardState() {
    fetch("http://192.168.1.71:8080/game/getScoreboardState")
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
  }, [
    millisecondsPerTick,
    /*setGetScoreboardStateInterval,
    clearGetScoreboardStateInterval,
    timerId,*/
  ]);

  React.useEffect(
    () => {
      if (currentGames.length === 0) {
        return;
      }

      fetch(
        "http://192.168.1.71:8080/gameEvent/getByGameId?gameId=" +
          currentGames[displayGameIndex].id
      )
        .then((res) => res.json())
        .then((json) => {
          setGameEvents(json.list);
        });
    },
    [displayGameIndex, currentGames] /*, [displayGameIndex, currentGames]*/
  );

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

  const handleRunningChange = (value: boolean) => {
    if (running) {
      fetch("http://192.168.1.71:8080/game/pauseGames");
    } else {
      fetch("http://192.168.1.71:8080/game/playGames");
    }
    setRunning(value);
  };

  const [scoreboardControlsDialogOpen, setScoreboardControlsDialogOpen] =
    React.useState(false);

  const handleScoreboardControlsDialogOpen = () => {
    setScoreboardControlsDialogOpen(true);
  };

  const handleScoreboardControlsDialogClose = () => {
    setScoreboardControlsDialogOpen(false);
  };

  /*const ScoreboardControls = (
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
  );*/

  return (
    <>
      <Box padding={3}>
        {/*<Box>{ScoreboardControls}</Box>*/}
        <ScoreboardControls
          running={running}
          millisecondsPerTick={millisecondsPerTick}
          gamesToPlay={gamesToPlay}
          handleRunningChange={handleRunningChange}
          handleScoreboardControlsDialogOpen={
            handleScoreboardControlsDialogOpen
          }
        />
        <Box display="flex" flexDirection="row" marginTop={4}>
          {currentGames.map((game, index) =>
            index !== displayGameIndex ? (
              <Box onClick={() => setDisplayGameIndex(index)}>
                <Scoreboard key={game.id} game={game} small />
              </Box>
            ) : (
              <div />
            )
          )}
        </Box>
        <Box marginTop={4}>
          {currentGames.length > 0 && (
            <Scoreboard
              game={
                currentGames != null && currentGames.length > 0
                  ? currentGames[displayGameIndex]
                  : null
              }
            />
          )}
        </Box>
        <Box marginTop={4}>
          {currentGames.length > 0 && <GameEventList gameEvents={gameEvents} game={currentGames[displayGameIndex]} />}
        </Box>
        <Box marginTop={4}>
          <SeasonDisplay seasonId={currentGames[displayGameIndex]?.seasonId} />
        </Box>
      </Box>

      <ScoreboardControlsDialog
        open={scoreboardControlsDialogOpen}
        onClose={handleScoreboardControlsDialogClose}
        gamesToPlay={gamesToPlay}
        millisecondsPerTick={millisecondsPerTick}
      />
    </>
  );
}
