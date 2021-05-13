import { isInaccessible } from '@testing-library/dom';
import React from 'react';
import './Scoreboard.css';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {game} = this.props;
    if (game != null) {
      return (
        <div class="scoreboard">
          <div class="scoreboard-color" /*style="background-color: blue"*/></div>
          <div class="scoreboard-home-team">{game.homeName}</div>
          <div class="scoreboard-home-score">{game.homeScore}</div>
          <div class="scoreboard-color" /*style="background-color: red"*/></div>
          <div class="scoreboard-away-team">{game.awayName}</div>
          <div class="scoreboard-away-score">{game.awayScore}</div>
          <div class="scoreboard-time">{game.clock.final ? "Final" : ""} {game.clock.minutes}:{game.clock.seconds} {game.clock.period} {game.clock.intermission ? "Intermission" : "Period"}</div>
        </div>
      )
    } else {
      return (<div>Waiting for a game...</div>);
    }      
  }
}

export default Scoreboard;