import React from "react";
import Game from "./Game";

export interface ClockDisplayProps {
  game: Game;
}

export default class ClockDisplay extends React.Component<ClockDisplayProps> {
  render() {
    const { game } = this.props;
    return (
      <span>
        {game.clock.final ? "Final" : ""} {game.clock.minutes}:
        {("0" + game.clock.seconds).slice(-2)} {game.clock.period}{" "}
        {game.clock.intermission ? "Intermission" : "Period"}
      </span>
    );
  }
}
