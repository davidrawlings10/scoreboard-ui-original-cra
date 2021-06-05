import React from "react";
import "./Home.css";
import PlayPauseToggle from "./PlayPauseToggle";
import AddGameForm from "./AddGameForm";
import Scoreboard from "./Scoreboard";
import Season from "./Season";
import CurrentGameList from "./CurrentGameList";
import typescriptTest from "./test";
import SeasonPage from "./SeasonPage";

export default class App extends React.Component {
  constructor(props) {
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
    this.timerId = setInterval(() => this.getGames(), 1000);
  }

  clearGetGamesInterval() {
    clearInterval(this.timerId, 1000);
  }

  getGames() {
    fetch("http://localhost:8080/game/getGames")
      .then((res) => res.json())
      .then((json) => {
        this.setState({ currentGames: json.list });
      });
  }

  onToggleChange() {
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
        <div>{typescriptTest}</div>
        <CurrentGameList
          games={
            this.state.currentGames != null &&
            this.state.currentGames.length > 0
              ? this.state.currentGames
              : null
          }
          updateDisplayIndex={
            this.updateDisplayIndex
          } /*updateDisplayGame={(index) => this.setState({displayGameIndex: index})}*/
        />
        <PlayPauseToggle
          toggleValue={this.state.playPauseToggle}
          onChange={this.onToggleChange}
        />
        <AddGameForm />
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
        <SeasonPage />
      </div>
    );
  }
}
