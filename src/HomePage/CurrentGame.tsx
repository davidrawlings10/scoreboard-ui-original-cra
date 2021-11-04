// keeping this as an example of a class component in tsx

import React from "react";
import { Box } from "@material-ui/core";

import "./CurrentGame.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import ClockDisplay from "../Shared/ClockDisplay";
import Game from "../Entity/Game";

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
        <Box bgcolor="primary.main">
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
        </Box>
      );
    } else {
      return <div>Waiting for a game...</div>;
    }
  }
}
