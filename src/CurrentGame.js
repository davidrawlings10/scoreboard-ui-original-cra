import React from "react";
import "./CurrentGame.css";
import TeamName from "./TeamDisplay";
import ClockDisplay from "./ClockDisplay";

export default class CurrentGame extends React.Component {
  constructor(props) {
    super(props);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  updateDisplayIndex() {
    this.props.updateDisplayIndex(this.props.index);
  }

  render() {
    const { game } = this.props;
    if (game != null) {
      /*<div onClick={this.props.updateDisplayGame(this.props.index)}>*/
      return (
        <div onClick={this.updateDisplayIndex} className="current-game">
          <div className="current-game-home-team">
            <TeamName id={game.homeTeamId} hideLocation={true} />
          </div>
          <div className="current-game-home-score">{game.homeScore}</div>
          <div className="current-game-away-team">
            <TeamName id={game.awayTeamId} hideLocation={true} />
          </div>
          <div className="current-game-away-score">{game.awayScore}</div>
          <div className="current-game-time">
            <ClockDisplay game={game} />
          </div>
        </div>
      );
    } else {
      return <div>Waiting for a game...</div>;
    }
  }
}
