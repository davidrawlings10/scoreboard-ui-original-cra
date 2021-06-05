import React from "react";
import SeasonStanding from "./SeasonStanding";
import SeasonGameList from "./SeasonGameList";
import { Button } from "@material-ui/core";
import "./Season.css";

export default class Season extends React.Component {
  constructor(props) {
    super(props);
    this.playSeasonGame = this.playSeasonGame.bind(this);
    this.setSeasonNumOfGamesToPlay = this.setSeasonNumOfGamesToPlay.bind(this);
  }

  playSeasonGame() {
    console.log("startSeasonGame()");
    fetch(
      "http://localhost:8080/game/startSeasonGame?seasonId=" +
        this.props.seasonId
    );
  }

  setSeasonNumOfGamesToPlay() {
    console.log("setSeasonNumOfGamesToPlay()");
    fetch(
      "http://localhost:8080/game/setSeasonNumOfGamesToPlay?seasonId=" +
        this.props.seasonId +
        "&numGames=2"
    );
  }

  render() {
    if (!this.props.seasonId) {
      return <div className="noSeasonForGame">No season for game</div>;
    }

    return (
      <div>
        <SeasonStanding seasonId={this.props.seasonId} />
        <SeasonGameList seasonId={this.props.seasonId} />
        <Button
          onClick={this.playSeasonGame}
          variant="contained"
          color="primary"
        >
          Play Season Game
        </Button>
        <Button
          onClick={this.setSeasonNumOfGamesToPlay}
          variant="contained"
          color="primary"
        >
          Set Season Num Of Game To Play
        </Button>
      </div>
    );
  }
}
