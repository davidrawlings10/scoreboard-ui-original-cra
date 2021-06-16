import React from "react";
import SeasonStanding from "./SeasonStanding";
import SeasonGameList from "./SeasonGameList";
import Button from "./Button";
import "./Season.css";

export type SeasonProps = {
  seasonId: number;
};

export default function Season(props: SeasonProps) {
  function playSeasonGame() {
    console.log("startSeasonGame()");
    fetch(
      "http://localhost:8080/game/startSeasonGame?seasonId=" + props.seasonId
    );
  }

  function setSeasonNumOfGamesToPlay() {
    console.log("setSeasonNumOfGamesToPlay()");
    fetch(
      "http://localhost:8080/game/setSeasonNumOfGamesToPlay?seasonId=" +
        props.seasonId +
        "&numGames=2"
    );
  }

  if (!props.seasonId) {
    return <div className="noSeasonForGame">No season for game</div>;
  }

  return (
    <div>
      <SeasonStanding seasonId={props.seasonId} />
      <SeasonGameList seasonId={props.seasonId} />
      <Button onClick={playSeasonGame}>Play Season Game</Button>
      <Button onClick={setSeasonNumOfGamesToPlay}>
        Set Season Num Of Game To Play
      </Button>
    </div>
  );
}
