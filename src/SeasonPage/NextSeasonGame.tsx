import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme";

import { Box, Button } from "@material-ui/core";
import Game from "../Entity/Game";
import config from "../config";
import TeamDisplay from "../Shared/TeamDisplay/TeamDisplay";
import Scoreboard from "../HomePage/Scoreboard";

const useStyles = makeStyles({
  highlight: {
    color: theme.palette.secondary.main,
  },
});

export type NextSeasonGameProps = {
  seasonId: number;
  numGames: { current: number; finished: number } | null;
};

export default function NextSeasonGame(props: NextSeasonGameProps) {
  const [nextSeasonGame, setNextSeasonGame] = useState<Game>();
  const [loading, setLoading] = useState<boolean>(false);

  const classes = useStyles();

  useEffect(() => {
    fetch(`${config.baseUrl}/game/getNextSeasonGame?seasonId=${props.seasonId}`)
      .then((res) => res.json())
      .then((game: Game) => setNextSeasonGame(game));
  }, [
    props.seasonId,
    loading,
    props.numGames?.current,
    props.numGames?.finished,
  ]);

  useEffect(() => {
    setLoading(false);
  }, [nextSeasonGame]);

  function handlePlayNow(): void {
    fetch(`${config.baseUrl}/game/playSeasonGame?gameId=${nextSeasonGame?.id}`);
    setLoading(true);
  }

  function handleResumeNow(): void {
    setLoading(true);
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        Loading...
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      <Box width={700}>
        <IncompleteGames
          seasonId={props.seasonId}
          handleResumeNow={handleResumeNow}
        />
        <Box mt={2}>
          <Box
            display="flex"
            justifyContent="center"
            bgcolor="primary.dark"
            border="1px solid #474f97"
            p={1}
            pl={2}
          >
            {!!nextSeasonGame
              ? "Next Game"
              : "There are no more scheduled games"}
          </Box>
          {!!nextSeasonGame && (
            <Box
              display="flex"
              flexDirection="row"
              border="1px solid #474f97"
              alignContent="center"
            >
              <Box
                display="flex"
                flexDirection="row"
                bgcolor="primary.main"
                p={1}
                width="100%"
                justifyContent="center"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  mr={4}
                  ml={4}
                  mt={1}
                  mb={1}
                  width="45%"
                >
                  <Box display="flex" justifyContent="flex-end">
                    <TeamDisplay id={nextSeasonGame.homeTeamId} />
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    Home
                  </Box>
                  <Box
                    className={classes.highlight}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    {(nextSeasonGame.teamAlreadyPlaying === "BOTH" ||
                      nextSeasonGame.teamAlreadyPlaying === "HOME") &&
                      "Currently Playing"}
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" p={2} width="10%">
                  Vs
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  mr={4}
                  ml={4}
                  mt={1}
                  mb={1}
                  width="45%"
                >
                  <TeamDisplay id={nextSeasonGame.awayTeamId} />
                  <Box>Away</Box>
                  <Box className={classes.highlight}>
                    {(nextSeasonGame.teamAlreadyPlaying === "BOTH" ||
                      nextSeasonGame.teamAlreadyPlaying === "AWAY") &&
                      "Currently Playing"}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Box mt={1} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlayNow}
              size="large"
              disabled={
                nextSeasonGame &&
                !(nextSeasonGame.teamAlreadyPlaying === "NONE")
              }
            >
              Play Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

interface IncompleteGamesProps {
  seasonId: number;
  handleResumeNow: () => void;
}

function IncompleteGames(props: IncompleteGamesProps) {
  const [incompleteGames, setIncompleteGames] = useState<Array<Game>>();

  useEffect(() => {
    fetch(
      `${config.baseUrl}/game/getIncompleteGames?seasonId=${props.seasonId}`
    )
      .then((res) => res.json())
      .then((incompleteGamesResult) => {
        setIncompleteGames(incompleteGamesResult.list);
      });
  }, [props.seasonId]);

  function handleResumeNow(gameId: number): void {
    fetch(`${config.baseUrl}/game/resumeIncompleteSeasonGame?gameId=${gameId}`);
    props.handleResumeNow();
  }

  if (!incompleteGames || incompleteGames.length === 0) {
    return <Box></Box>;
  }

  return (
    <Box border="1px solid #474f97">
      <Box
        bgcolor="primary.dark"
        border="1px solid #474f97"
        p={1}
        pl={2}
        display="flex"
        justifyContent="center"
      >
        {incompleteGames.length === 1
          ? "This game is incomplete"
          : "These games are incomplete"}
      </Box>
      {incompleteGames.map((game: Game) => {
        return (
          <Box mt={2} mb={4} ml={2} display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column">
              <Scoreboard game={game} small />
              <Box m={1} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleResumeNow(game.id);
                  }}
                >
                  Resume Now
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
