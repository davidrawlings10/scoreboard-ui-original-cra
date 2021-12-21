import React from "react";
import { Box } from "@material-ui/core";

import "./Scoreboard.css";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import ClockDisplay from "../Shared/GameClockDisplay";
import Game from "../Entity/Game";

export type ScoreboardProps = {
  game: Game | null;
};

export default function Scoreboard(props: ScoreboardProps) {
  if (!props.game) {
    return <div></div>;
  }

  return (
    <Box className="scoreboard">
      <Box
        className="scoreboard-color" /*style="background-color: blue"*/
        bgcolor="primary.main"
      ></Box>
      <Box className="scoreboard-home-team" bgcolor="primary.main">
        <TeamDisplay id={props.game.homeTeamId} />
      </Box>
      <Box className="scoreboard-home-score" bgcolor="primary.main">
        {props.game.homeScore}
      </Box>
      <Box
        className="scoreboard-color"
        bgcolor="primary.main" /*style="background-color: red"*/
      ></Box>
      <Box className="scoreboard-away-team" bgcolor="primary.main">
        <TeamDisplay id={props.game.awayTeamId} />
      </Box>
      <Box className="scoreboard-away-score" bgcolor="primary.main">
        {props.game.awayScore}
      </Box>
      <Box className="scoreboard-time" bgcolor="primary.main">
        <ClockDisplay game={props.game} />
      </Box>
    </Box>
  );
}
