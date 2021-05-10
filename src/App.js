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
    this.state = {toggle: false}
    this.onToggleChange = this.onToggleChange.bind(this);
  }

  onToggleChange() {
    if (!this.state.toggle) {
      fetch("http://localhost:8080/game/playGames")
    } else {
      fetch("http://localhost:8080/game/pauseGames")
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
    return (
      <div className="App">
        <Toggle value={this.state.toggle} onChange={this.onToggleChange}/>
        <AddGameForm/>
        <Scoreboard/>
        <Standing/>
        <GameList/>
        <Button onClick={this.playSeasonGames}>Play Season Games</Button>
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
