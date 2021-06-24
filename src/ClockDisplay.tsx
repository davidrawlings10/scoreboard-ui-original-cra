import React from "react";
import Game from "./Domain/Game";

export type ClockDisplayProps = {
  game: Game;
};

export default function ClockDisplay(props: ClockDisplayProps) {
  const { game } = props;

  if (game.status === "FINAL") {
    return (
      <span>
        Final {game.endingPeriod > 3 ? game.endingPeriod - 3 + "OT" : ""}
      </span>
    );
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
