import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";
import { Switch, Box, FormControlLabel } from "@material-ui/core";

export default function App() {
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);

  const [running, setRunning] = React.useState(false);

  const [tickMilli, setTickMilli] = React.useState<number>(1000);
  const [tickMilliUserTyping, setTickMilliUserTyping] =
    React.useState<boolean>(false);

  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);
  const [gamesToPlayTyping, setGamesToPlayTyping] =
    React.useState<boolean>(false);

  let timerId: any = null;

  function getScoreboardState() {
    fetch("http://localhost:8080/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        setRunning(json.running);
        console.log(
          "tickMilliUserTyping:" +
            tickMilliUserTyping +
            ", gamesToPlayTyping:" +
            gamesToPlayTyping
        );
        if (!tickMilliUserTyping) {
          setTickMilli(json.tickMilliseconds);
        }
        if (!gamesToPlayTyping) {
          setGamesToPlay(json.gamesToPlay);
        }
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
  }

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (running) {
      fetch("http://localhost:8080/game/pauseGames");
    } else {
      fetch("http://localhost:8080/game/playGames");
    }
    setRunning(event.target.checked);
  };

  const handleGamesToPlayBlur = () => {
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
            labelPlacement="start"
          />
          <TickMilliInput
            updateGetGamesInterval={updateGetScoreboardStateInterval}
            tickMilli={tickMilli}
            handleTickMilliInputChange={handleTickMilliInputChange}
          />
          <FormControlLabel
            label="Number of Games to Play"
            control={
              <input
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
