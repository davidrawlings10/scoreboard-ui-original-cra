import React from "react";
import CurrentGame from "./CurrentGame";
import "./CurrentGameList.css";
import Game from "./Game";

export interface CurrentGameListProps {
  games: Array<Game>;
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
    if (this.props.games != null) {
      return (
        <div className="current-game-list">
          {this.props.games.map((game, index) => (
            <CurrentGame
              game={game}
              index={index}
              updateDisplayIndex={this.updateDisplayIndex}
            />
          ))}
        </div>
      );
    } else {
      return <div>waiting for games...</div>;
    }
  }
}
