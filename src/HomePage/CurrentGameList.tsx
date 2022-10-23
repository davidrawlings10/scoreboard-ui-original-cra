import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import Game from "../Entity/Game";
import Scoreboard from "./Scoreboard";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";

interface CurrentGameListProps {
  games: Array<Game>;
  displayGame: Game | null;
  handleUpdateDisplayGameId: (id: number) => void;
}

export default function CurrentGameList(props: CurrentGameListProps) {
  const PAGE_SIZE: number = 6;
  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentGameListLength, setCurrentGameListLength] = useState<number>(0);

  useEffect(() => {
    setCurrentGameListLength(
      props.games.length - (!!props.displayGame ? 1 : 0)
    );
  }, [props.games, props.displayGame]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(currentGameListLength / PAGE_SIZE));
  }, [props.games, props.displayGame, currentGameListLength]);

  const handlePrevClick = () => {
    if (page === 1) {
      return;
    }

    setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page === numberOfPages) {
      return;
    }

    setPage(page + 1);
  };

  const handleUpdateDisplayGameId = (id: number) => {
    props.handleUpdateDisplayGameId(id);
  };

  if (!props.games) {
    return <div />;
  }

  const BUTTON_STYLE = {
    maxWidth: "50px",
    maxHeight: "120px",
    minWidth: "50px",
    minHeight: "120px",
  };

  return (
    <Box display="flex" flexDirection="column" marginTop={4}>
      <Box display="flex" flexDirection="row" mb={1}>
        <Box display="flex" alignContent="center">
          {currentGameListLength > PAGE_SIZE && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevClick}
              style={BUTTON_STYLE}
            >
              <NavigateBefore />
            </Button>
          )}
        </Box>
        <Box display="flex" flexDirection="column" ml={2} mr={2}>
          <Box display="flex" flexDirection="row" mb={1}>
            {props.games
              .filter((game) => game.id !== props.displayGame?.id)
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((game) => (
                <div onClick={() => handleUpdateDisplayGameId(game.id)}>
                  <Scoreboard key={game.id} game={game} small />
                </div>
              ))}
          </Box>
          {currentGameListLength > PAGE_SIZE && (
            <Box>{`Page ${page}/${numberOfPages}`}</Box>
          )}
        </Box>
        {currentGameListLength > PAGE_SIZE && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextClick}
            style={BUTTON_STYLE}
          >
            <NavigateNext />
          </Button>
        )}
      </Box>
    </Box>
  );
}
