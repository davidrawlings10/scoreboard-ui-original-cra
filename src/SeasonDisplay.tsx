import SeasonStanding from "./SeasonStanding";
import SeasonGameList from "./SeasonGameList";
import SeasonStandingSortable from "./SeasonStandingSortable";
import SeasonGameListSortable from "./SeasonGameListSortable";
import Button from "./Components/Button";
import "./SeasonDisplay.css";

export type SeasonProps = {
  seasonId: number;
};

export default function SeasonDisplay(props: SeasonProps) {
  function playSeasonGame() {
    console.log("startSeasonGame()");
    fetch(
      "http://localhost:8080/game/startSeasonGame?seasonId=" + props.seasonId
    );
  }

  function setSeasonNumOfGamesToPlay() {
    console.log("setSeasonNumOfGamesToPlay()");
    fetch(
      "http://localhost:8080/game/setSeasonNumOfGamesToPlay?numberOfGames=2"
    );
  }

  if (!props.seasonId) {
    return <div></div>;
  }

  return (
    <div>
      <Button onClick={playSeasonGame}>Play Next Season Game</Button>
      <Button onClick={setSeasonNumOfGamesToPlay}>
        Set Season Num Of Game To Play
      </Button>
      <SeasonStanding seasonId={props.seasonId} />
      <SeasonGameList seasonId={props.seasonId} />
      <SeasonStandingSortable seasonId={props.seasonId} />
      <SeasonGameListSortable seasonId={props.seasonId} />
    </div>
  );
}