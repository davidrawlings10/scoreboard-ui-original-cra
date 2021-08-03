import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Button from "./Components/Button";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";
import { Switch } from "@material-ui/core";

export type HomeProps = {};

export default function App(props: HomeProps) {
  // const [playPauseToggle, setPlayPauseToggle] = React.useState(false);
  const [currentGames, setCurrentGames] = React.useState(Array<Game>());
  const [displayGameIndex, setDisplayGameIndex] = React.useState(0);
  const [switchState, setSwitchState] = React.useState(false);

  React.useEffect(() => {
    /*if (playPauseToggle) {
      setGetGamesInterval();
    }*/
    return function cleanup() {
      clearGetGamesInterval();
    };
  }, []);

  let timerId: any;

  function setGetGamesInterval() {
    timerId = setInterval(() => getGames(), 1000);
  }

  function clearGetGamesInterval() {
    clearInterval(timerId);
  }

  function updateGetGamesInterval(ms: number) {
    clearInterval(timerId);
    timerId = setInterval(() => getGames(), ms);
  }

  function getGames() {
    fetch("http://localhost:8080/game/getGames")
      .then((res) => res.json())
      .then((json) => {
        setCurrentGames(json.list);
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

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (switchState) {
      fetch("http://localhost:8080/game/pauseGames");
      clearGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/playGames");
      setGetGamesInterval();
    }
    setSwitchState(event.target.checked);
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
        <Switch checked={switchState} onChange={handleSwitchChange} />
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
