import './App.css';
// import logo from './logo.svg';
// import MyComponent from './MyComponent';
// import GetRequest from './Other/GetRequest';
// import Div from './Div';
import Toggle from './Toggle';
// import AddGame from './AddGame';
import AddGameForm from './AddGameForm';
import Scoreboard from './Scoreboard';
import Standing from './Standing';
import GameList from './GameList';
import React from 'react';
import { Button } from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggle: false, currentGames: []}
    this.onToggleChange = this.onToggleChange.bind(this);
  }

  componentDidMount() {
    // this.setGetGamesInterval();
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
    // console.log("getGames() - " + this.state.currentGames);
    fetch("http://localhost:8080/game/getGames")
      .then(res => res.json())
      .then(json => { this.setState({currentGames: json.list}) })
      /*.then(
        (game) => {
        // console.log("game:" + game + ", gameclock.minutes:" + game.clock.minutes + ", game.clock.seconds:" + game.clock.seconds);
          this.setState({
            isLoaded: true,
            homeName: game.homeName,
            awayName: game.awayName,
            homeScore: game.homeScore,
            awayScore: game.awayScore,
            period: game.clock.period,
            minutes: game.clock.minutes,
            seconds: game.clock.seconds,
            intermission: game.clock.intermission
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )*/
  }

  onToggleChange() {
    if (!this.state.toggle) {
      fetch("http://localhost:8080/game/playGames")
      this.setGetGamesInterval();
    } else {
      fetch("http://localhost:8080/game/pauseGames")
      this.clearGetGamesInterval();
    }
    this.setState(state => ({
      toggle: !state.toggle
    }));
  }

  playSeasonGames() {
    console.log("playSeasonGames()");
    fetch("http://localhost:8080/game/playSeasonGames?seasonId=1&numGames=3")
  }

  render() {
    console.log("render()");
    return (
      <div className="App">
        <Toggle value={this.state.toggle} onChange={this.onToggleChange}/>
        <AddGameForm/>
        <Scoreboard game={this.state.currentGames != null && this.state.currentGames.length > 0 ? this.state.currentGames[0] : null}/>
        <Standing/>
        <GameList/>
        <Button onClick={this.playSeasonGames}>Play Season Games</Button>
      </div>
    );
    /*<Scoreboard currentGames={this.currentGames[0]}/>*/
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
