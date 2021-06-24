import React from "react";
import Game from "./Domain/Game";

export type ClockDisplayProps = {
  game: Game;
};

function getFinalText(endingPeriod: number) {
  let displayText = "Final ";

  if (endingPeriod >= 5) {
    displayText += endingPeriod - 3;
  }

  if (endingPeriod >= 4) {
    displayText += "OT";
  }

  return displayText;
}

export default function ClockDisplay(props: ClockDisplayProps) {
  const { game } = props;

  if (game.status === "FINAL") {
    return <span>{getFinalText(game.endingPeriod)}</span>;
  }

  if (game.clock.intermission) {
    return (
      <span>
        {game.clock.minutes}:{("0" + game.clock.seconds).slice(-2)}{" "}
        {game.clock.period} Intermission
      </span>
    );
  } else {
    return (
      <span>
        {game.clock.minutes}:{("0" + game.clock.seconds).slice(-2)}{" "}
        {game.clock.period} Period
      </span>
    );
  }
}
