import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";
import { Switch, Box, FormControlLabel, Input } from "@material-ui/core";

export type HomeProps = {};

export default function App(props: HomeProps) {
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [tickMilli, setTickMilli] = React.useState<number>(1000);
  const [tickMilliUserTyping, setTickMilliUserTyping] =
    React.useState<boolean>(false);
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);

  let timerId: any = null;

  function getScoreboardState() {
    fetch("http://localhost:8080/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        if (!tickMilliUserTyping) {
          setTickMilli(json.tickMilliseconds);
        }
        setRunning(json.running);
      });
  }

  React.useEffect(() => {
    setGetScoreboardStateInterval(tickMilli);
    return function cleanup() {
      if (!!timerId) {
        clearGetScoreboardStateInterval();
      }
    };
  }, [tickMilli]);

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

  function updateGetScoreboardStateInterval() {
    fetch("http://localhost:8080/game/setTickMilliseconds?value=" + tickMilli);
    setTickMilliUserTyping(false);
  }

  function handleTickMilliInputChange(value: number) {
    clearGetScoreboardStateInterval();
    setTickMilli(value);
    setTickMilliUserTyping(true);
  }

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (running) {
      fetch("http://localhost:8080/game/pauseGames");
    } else {
      fetch("http://localhost:8080/game/playGames");
    }
    setRunning(event.target.checked);
  };

  const handleGamesToPlayChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGamesToPlay(parseInt(event.target.value));
  };

  const handleGamesToPlayBlur = () => {
    fetch("http://localhost:8080/game/setGamesToPlay?numGames=" + gamesToPlay);
  };

  return (
    <div className="Home">
      <Box>
        <Box>
          <FormControlLabel
            control={
              <Switch checked={running} onChange={handleRunningChange} />
            }
            label="Playing"
          />
          <TickMilliInput
            updateGetGamesInterval={updateGetScoreboardStateInterval}
            tickMilli={tickMilli}
            handleTickMilliInputChange={handleTickMilliInputChange}
          />
          <FormControlLabel
            label="Number of Games to Play"
            control={
              <Input
                onChange={handleGamesToPlayChange}
                onBlur={handleGamesToPlayBlur}
                value={gamesToPlay}
              />
            }
            labelPlacement="start"
          />
        </Box>
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
