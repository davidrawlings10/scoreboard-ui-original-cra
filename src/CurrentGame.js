import React from 'react';
import './CurrentGame.css';

class CurrentGame extends React.Component {
  constructor(props) {
    super(props);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  updateDisplayIndex() {
    this.props.updateDisplayIndex(this.props.index);
  }

  render() {
    const {game} = this.props;
    if (game != null) {
        /*<div onClick={this.props.updateDisplayGame(this.props.index)}>*/
      return (
        <div onClick={this.updateDisplayIndex} class="current-game">
          <div class="current-game-home-team">{game.homeName}</div>
          <div class="current-game-home-score">{game.homeScore}</div>
          <div class="current-game-away-team">{game.awayName}</div>
          <div class="current-game-away-score">{game.awayScore}</div>
          <div class="current-game-time">{game.clock.final ? "Final" : ""} {game.clock.minutes}:{game.clock.seconds} {game.clock.period} {game.clock.intermission ? "Intermission" : "Period"}</div>
        </div>
      )
    } else {
      return (<div>Waiting for a game...</div>);
    }   
  }
}

export default CurrentGame;