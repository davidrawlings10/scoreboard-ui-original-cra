import React from 'react';
import './App.css';
import PlayPauseToggle from './PlayPauseToggle';
import AddGameForm from './AddGameForm';
import Scoreboard from './Scoreboard';
import SeasonStanding from './SeasonStanding';
import SeasonGameList from './SeasonGameList';
import CurrentGameList from './CurrentGameList';
import { Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playPauseToggle: true, currentGames: [], displayGameIndex: 0}
    this.onToggleChange = this.onToggleChange.bind(this);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  componentDidMount() {
    if (this.state.playPauseToggle == true) {
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
      .then(res => res.json())
      .then(json => { this.setState({currentGames: json.list}) })
  }

  onToggleChange() {
    if (!this.state.playPauseToggle) {
      fetch("http://localhost:8080/game/playGames")
      this.setGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/pauseGames")
      this.clearGetGamesInterval();
    }
    this.setState(state => ({
      playPauseToggle: !state.playPauseToggle
    }));
  }

  updateDisplayIndex(index) {
    this.setState({displayGameIndex: index});
  }

  playSeasonGame() {
    console.log("startSeasonGame()");
    fetch("http://localhost:8080/game/startSeasonGame?seasonId=1")
  }

  setSeasonNumOfGamesToPlay() {
    console.log("setSeasonNumOfGamesToPlay()");
    fetch("http://localhost:8080/game/setSeasonNumOfGamesToPlay?seasonId=1&numGames=4")
  }

  scheduleSeason() {
    console.log("scheduleSeason()");
    fetch("http://localhost:8080/season/schedule?scheduleType=ROUNDS&sport=HOCKEY&leagueId=1&numGames=82")
    // fetch("http://localhost:8080/season/schedule?scheduleType=HOME_ROTATION&sport=HOCKEY&leagueId=3")
  }

  render() {
    return (
      <div className="App">
        <CurrentGameList games={this.state.currentGames != null && this.state.currentGames.length > 0 ? this.state.currentGames : null} updateDisplayIndex={this.updateDisplayIndex} /*updateDisplayGame={(index) => this.setState({displayGameIndex: index})}*/ />
        <PlayPauseToggle toggleValue={this.state.playPauseToggle} onChange={this.onToggleChange}/>
        <AddGameForm/>
        <Scoreboard game={this.state.currentGames != null && this.state.currentGames.length > 0 ? this.state.currentGames[this.state.displayGameIndex] : null}/>
        <SeasonStanding/>
        <SeasonGameList/>
        <Button onClick={this.playSeasonGame} variant="contained" color="primary">Play Season Game</Button>
        <Button onClick={this.setSeasonNumOfGamesToPlay} variant="contained" color="primary">Set Season Num Of Game To Play</Button>
        <Button onClick={this.scheduleSeason} variant="contained" color="primary">Schedule Season</Button>
      </div>
    );
  }
}

/*<Button text="Schedule" />
<Div text="456" />
        <a
          className="App-link"
          href="http://localhost:8080/game/play"
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Game
        </a>
*/
  
// setInterval(App, 1000);

export default App;
