import { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import Game from "../Entity/Game";
import config from "../config";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";

export type NextSeasonGameProps = {
  seasonId: number;
};

export default function NextSeasonGame(props: NextSeasonGameProps) {
  const [nextSeasonGame, setNextSeasonGame] = useState<Game>();

  useEffect(() => {
    fetch(`${config.baseUrl}/game/getNextSeasonGame?seasonId=${props.seasonId}`)
      .then((res) => res.json())
      .then((game: Game) => setNextSeasonGame(game));
  }, [props.seasonId]);

  function handlePlayNow(): void {
    fetch(`${config.baseUrl}/game/playSeasonGame?gameId=${nextSeasonGame?.id}`);
  }

  if (!nextSeasonGame) {
    return <Box>Season is concluded</Box>;
  }

  return (
    <Box>
      <InterruptedGames seasonId={props.seasonId} />
      <TeamDisplay id={nextSeasonGame.homeTeamId} />
      <TeamDisplay id={nextSeasonGame.awayTeamId} />
      {nextSeasonGame.teamAlreadyPlaying === "NONE" && (
        <Button onClick={handlePlayNow}>Play Now</Button>
      )}
      {nextSeasonGame.teamAlreadyPlaying === "HOME" &&
        <TeamDisplay id={nextSeasonGame.homeTeamId} /> +
          " home is already playing"}
      {nextSeasonGame.teamAlreadyPlaying === "AWAY" &&
        <TeamDisplay id={nextSeasonGame.awayTeamId} /> +
          " away is already playing"}
      {nextSeasonGame.teamAlreadyPlaying === "BOTH" &&
        "Both teams are already playing"}
    </Box>
  );
}

interface InterruptedGamesProps {
  seasonId: number;
}

function InterruptedGames(props: InterruptedGamesProps) {
  const [interruptedGames, setInterruptedGames] = useState<Array<Game>>();

  useEffect(() => {
    fetch(
      `${config.baseUrl}/game/getInterruptedGames?seasonId=${props.seasonId}`
    )
      .then((res) => res.json())
      .then((interruptedGamesResult) => {
        setInterruptedGames(interruptedGamesResult.list);
      });
  }, [props.seasonId]);

  function handleResumeNow(gameId: number): void {
    fetch(
      `${config.baseUrl}/game/resumeInterruptedSeasonGame?gameId=${gameId}`
    );
  }

  if (!interruptedGames) {
    return <Box></Box>;
  }

  return (
    <Box>
      {interruptedGames.map((game: Game) => {
        return (
          <Box>
            <TeamDisplay id={game.homeTeamId} />
            <TeamDisplay id={game.awayTeamId} />
            <Button
              onClick={() => {
                handleResumeNow(game.id);
              }}
            >
              Resume Now
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}
