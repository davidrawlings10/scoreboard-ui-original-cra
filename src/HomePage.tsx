import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Button from "./Components/Button";
import PlayPauseToggle from "./PlayPauseToggle";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";

export type HomeProps = {};

export default function App(props: HomeProps) {
  const [playPauseToggle, setPlayPauseToggle] = React.useState(true);
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);

  React.useEffect(() => {
    if (playPauseToggle) {
      setGetGamesInterval();
    }
    return function cleanup() {
      clearGetGamesInterval();
    };
  }, []);

  let timerId: any;

  function setGetGamesInterval() {
    timerId = setInterval(() => getGames(), 1000);
    console.log("timerId:" + timerId);
  }

  function clearGetGamesInterval() {
    clearInterval(timerId);
    console.log("timerId:" + timerId);
  }

  function updateGetGamesInterval(ms: number) {
    console.log("timerId:" + timerId);
    console.log("updateGetGamesInterval" + ms);
    clearInterval(timerId);
    timerId = setInterval(() => getGames(), ms);
    console.log("timerId:" + timerId);
  }

  function getGames() {
    fetch("http://localhost:8080/game/getGames")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.list);
      });
  }

  function onToggleChange() {
    if (!playPauseToggle) {
      fetch("http://localhost:8080/game/playGames");
      setGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/pauseGames");
      clearGetGamesInterval();
    }
    setPlayPauseToggle(!playPauseToggle);
  }

  return (
    <div className="Home">
      <CurrentGameList
        games={
          currentGames != null && currentGames.length > 0 ? currentGames : null
        }
        updateDisplayIndex={(index) => setDisplayGameIndex(index)}
      />
      <div className="ControlsContainer">
        <Button onChange={onToggleChange} style={{ display: "none" }}>
          {playPauseToggle ? "ON" : "OFF"}
        </Button>
        <PlayPauseToggle
          toggleValue={playPauseToggle}
          onChange={onToggleChange}
        />
        <TickMilliInput updateGetGamesInterval={updateGetGamesInterval} />
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
