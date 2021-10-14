import React from "react";
import "./Scoreboard.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import ClockDisplay from "../Shared/ClockDisplay";
import Game from "../Entity/Game";

export type ScoreboardProps = {
  game: Game | null;
};

export default function Scoreboard(props: ScoreboardProps) {
  if (!props.game) {
    return <div></div>;
  }

  return (
    <div className="scoreboard">
      <div
        className="scoreboard-color" /*style="background-color: blue"*/
      ></div>
      <div className="scoreboard-home-team">
        <TeamDisplay id={props.game.homeTeamId} />
      </div>
      <div className="scoreboard-home-score">{props.game.homeScore}</div>
      <div className="scoreboard-color" /*style="background-color: red"*/></div>
      <div className="scoreboard-away-team">
        <TeamDisplay id={props.game.awayTeamId} />
      </div>
      <div className="scoreboard-away-score">{props.game.awayScore}</div>
      <div className="scoreboard-time">
        <ClockDisplay game={props.game} />
      </div>
    </div>
  );
}
