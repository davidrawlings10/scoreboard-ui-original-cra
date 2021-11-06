// keeping this as an example of a class component in tsx

import React from "react";
import { Box } from "@material-ui/core";

import CurrentGame from "./CurrentGame";
import "./CurrentGameList.css";
import Game from "../Entity/Game";

export interface CurrentGameListProps {
  games: Array<Game> | null;
  updateDisplayIndex: (index: number) => void;
}

export default class CurrentGameList extends React.Component<CurrentGameListProps> {
  constructor(props: CurrentGameListProps) {
    super(props);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  updateDisplayIndex(index: number) {
    this.props.updateDisplayIndex(index);
  }

  render() {
    if (!this.props.games) {
      return <div></div>;
    }

    return (
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        marginTop={5}
        marginBottom={5}
      >
        {this.props.games.map((game, index) => {
          return (
            <CurrentGame
              key={game.id}
              game={game}
              index={index}
              updateDisplayIndex={this.updateDisplayIndex}
            />
          );
        })}
      </Box>
    );
  }
}
