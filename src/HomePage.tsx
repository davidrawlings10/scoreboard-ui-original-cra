import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";
import { Switch } from "@material-ui/core";

export type HomeProps = {};

export default function App(props: HomeProps) {
  // const [playPauseToggle, setPlayPauseToggle] = React.useState(false);
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [tickMilli, setTickMilli] = React.useState<number>(1000);
  const [tickMilliUserTyping, setTickMilliUserTyping] =
    React.useState<boolean>(false);

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
    setGetGamesInterval(tickMilli);
    return function cleanup() {
      if (!!timerId) {
        clearGetGamesInterval();
      }
    };
  }, [tickMilli]);

  function setGetGamesInterval(milliseconds: number) {
    console.log("setGetGamesInterval()");
    timerId = setInterval(() => getGames(), Math.max(milliseconds, 200));
  }

  function clearGetGamesInterval() {
    console.log("clearGetGamesInterval()");
    clearInterval(timerId);
    timerId = null;
  }

  function getGames() {
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

  function updateGetGamesInterval() {
    /*console.log("updateGetGamesInterval()");
    clearInterval(timerId);
    timerId = setInterval(() => getGames(), ms);*/
    fetch("http://localhost:8080/game/setTickMilliseconds?value=" + tickMilli);
    setTickMilliUserTyping(false);
    // setTickMilli(tickMilli);
  }

  function handleChange(value: number) {
    console.log("HomePage:handleChange()" + value);
    clearGetGamesInterval();
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

  return (
    <div className="Home">
      <CurrentGameList
        games={
          currentGames != null && currentGames.length > 0 ? currentGames : null
        }
        updateDisplayIndex={(index) => setDisplayGameIndex(index)}
      />
      <div>
        <Switch checked={running} onChange={handleRunningChange} />
        <TickMilliInput
          updateGetGamesInterval={updateGetGamesInterval}
          tickMilli={tickMilli}
          handleChange={handleChange}
        />
      </div>
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
