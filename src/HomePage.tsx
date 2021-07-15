import React from "react";
import Scoreboard from "./Scoreboard";
import SeasonDisplay from "./SeasonDisplay";
import CurrentGameList from "./CurrentGameList";
import Button from "./Components/Button";
import Game from "./Entity/Game";
import TickMilliInput from "./TickMilliInput";
import styled from "styled-components";

const Div = styled.div`
  background-color: #00003b;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

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

  function onToggleChange() {
    console.log("onToggleChange");
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
      <Div>
        <Button onClick={onToggleChange}>
          {playPauseToggle ? "ON" : "OFF"}
        </Button>
        <TickMilliInput updateGetGamesInterval={updateGetGamesInterval} />
      </Div>
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
