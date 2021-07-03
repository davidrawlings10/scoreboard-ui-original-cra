import React from "react";
import Scoreboard from "./Scoreboard";
import Season from "./Season";
import CurrentGameList from "./CurrentGameList";
import Button from "./Components/Button";
import PlayPauseToggle from "./PlayPauseToggle";
import Game from "./Entity/Game";

export type AppProps = {
  playPauseToggle: Boolean;
  currentGames: Array<Game>;
  displayGameIndex: number;
  seasonId: number;
};

export default function App(props: AppsProps) {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      playPauseToggle: true,
      currentGames: [],
      displayGameIndex: 0,
      seasonId: 63,
    };
    this.onToggleChange = this.onToggleChange.bind(this);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  componentDidMount() {
    if (this.state.playPauseToggle === true) {
      this.setGetGamesInterval();
    }
  }

  componentWillUnmount() {
    this.clearGetGamesInterval();
  }

  setGetGamesInterval() {
    this.timerId = setInterval(() => this.getGames(), 500);
  }

  clearGetGamesInterval() {
    clearInterval(this.timerId, 500);
  }

  getGames() {
    fetch("http://localhost:8080/game/getGames")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ currentGames: json.list });
      });
  }

  onToggleChange() {
    console.log("playPauseToggle" + this.state.playPauseToggle);
    if (!this.state.playPauseToggle) {
      fetch("http://localhost:8080/game/playGames");
      this.setGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/pauseGames");
      this.clearGetGamesInterval();
    }
    this.setState((state) => ({
      playPauseToggle: !state.playPauseToggle,
    }));
  }

  updateDisplayIndex(index) {
    this.setState({ displayGameIndex: index });
  }

  render() {
    return (
      <div className="Home">
        <CurrentGameList
          games={
            this.state.currentGames != null &&
            this.state.currentGames.length > 0
              ? this.state.currentGames
              : null
          }
          updateDisplayIndex={(index) =>
            this.setState({ displayGameIndex: index })
          }
        />
        <Button onChange={this.onToggleChange} style={{ display: "none" }}>
          {this.state.playPauseToggle ? "ON" : "OFF"}
        </Button>
        <PlayPauseToggle
          toggleValue={this.state.playPauseToggle}
          onChange={this.onToggleChange}
        />
        <Scoreboard
          game={
            this.state.currentGames != null &&
            this.state.currentGames.length > 0
              ? this.state.currentGames[this.state.displayGameIndex]
              : null
          }
        />
        <Season
          seasonId={
            this.state.currentGames[this.state.displayGameIndex]?.seasonId
          }
        />
        <div style={{ marginTop: 100 }}></div>
      </div>
    );
  }
}
