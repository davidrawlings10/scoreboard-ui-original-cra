import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";
import { Switch, Box, FormControlLabel, Input } from "@material-ui/core";
import styled from "styled-components";

export type HomeProps = {};

export default function App(props: HomeProps) {
  // const [playPauseToggle, setPlayPauseToggle] = React.useState(false);
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [tickMilli, setTickMilli] = React.useState<number>(1000);
  const [tickMilliUserTyping, setTickMilliUserTyping] =
    React.useState<boolean>(false);
  const [gamesToPlay, setGamesToPlay] = React.useState<number>(0);

  /*React.useEffect(() => {
    // if (playPauseToggle) {
      setGetGamesInterval();
    // }
    return function cleanup() {
      clearGetGamesInterval();
    };
  }, []);*/

  let timerId: any = null;

  React.useEffect(() => {
    setGetScoreboardStateInterval(tickMilli);
    return function cleanup() {
      if (!!timerId) {
        clearGetScoreboardStateInterval();
      }
    };
  }, [tickMilli]);

  function setGetScoreboardStateInterval(milliseconds: number) {
    console.log("setGetGamesInterval()");
    timerId = setInterval(() => getScoreboardState(), Math.max(milliseconds, 200));
  }

  function clearGetScoreboardStateInterval() {
    console.log("clearGetGamesInterval()");
    clearInterval(timerId);
    timerId = null;
  }

  function getScoreboardState() {
    fetch("http://localhost:8080/game/getScoreboardState")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.games);
        if (!tickMilliUserTyping) {
          setTickMilli(json.tickMilliseconds);
        }
        setRunning(json.running);
        console.log("json.tickMilliseconds:" + json.tickMilliseconds);
      });
  }

  /*function onToggleChange() {
    console.log("onToggleChange");
    if (!playPauseToggle) {
      fetch("http://localhost:8080/game/playGames");
      setGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/pauseGames");
      clearGetGamesInterval();
    }
    setPlayPauseToggle(!playPauseToggle);
  }*/

  function updateGetScoreboardStateInterval() {
    /*console.log("updateGetGamesInterval()");
    clearInterval(timerId);
    timerId = setInterval(() => getGames(), ms);*/
    fetch("http://localhost:8080/game/setTickMilliseconds?value=" + tickMilli);
    setTickMilliUserTyping(false);
    // setTickMilli(tickMilli);
  }

  function handleTickMilliInputChange(value: number) {
    console.log("HomePage:handleChange()" + value);
    clearGetScoreboardStateInterval();
    setTickMilli(value);
    setTickMilliUserTyping(true);
  }

  const handleRunningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (running) {
      fetch("http://localhost:8080/game/pauseGames");
      // clearGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/playGames");
      // setGetGamesInterval();
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
