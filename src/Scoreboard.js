import React from "react";
import "./Scoreboard.css";
import TeamDisplay from "./TeamDisplay";
import ClockDisplay from "./ClockDisplay";

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.game) {
      return;
    }
  }

  render() {
    const { game } = this.props;

    if (game != null) {
      return (
        <div className="scoreboard">
          <div
            className="scoreboard-color" /*style="background-color: blue"*/
          ></div>
          <div className="scoreboard-home-team">
            <TeamDisplay id={game.homeTeamId} />
          </div>
          <div className="scoreboard-home-score">{game.homeScore}</div>
          <div
            className="scoreboard-color" /*style="background-color: red"*/
          ></div>
          <div className="scoreboard-away-team">
            <TeamDisplay id={game.awayTeamId} />
          </div>
          <div className="scoreboard-away-score">{game.awayScore}</div>
          <div className="scoreboard-time">
            <ClockDisplay game={game} />
          </div>
        </div>
      );
    } else {
      return <div>Waiting for a game...</div>;
    }
  }
}

export default Scoreboard;
