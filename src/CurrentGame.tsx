import React from "react";
import "./CurrentGame.css";
import TeamDisplay from "./TeamDisplay";
import ClockDisplay from "./ClockDisplay";
import Game from "./Game";

export interface CurrentGameProps {
  index: number;
  game: Game;
  updateDisplayIndex: (index: number) => void;
}

export default class CurrentGame extends React.Component<CurrentGameProps> {
  constructor(props: CurrentGameProps) {
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
            <TeamDisplay id={game.homeTeamId} hideLocation={true} />
          </div>
          <div className="current-game-home-score">{game.homeScore}</div>
          <div className="current-game-away-team">
            <TeamDisplay id={game.awayTeamId} hideLocation={true} />
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
