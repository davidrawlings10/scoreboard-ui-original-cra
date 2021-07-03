import React from "react";
import CurrentGame, { CurrentGameProps } from "./CurrentGame";
import "./CurrentGameList.css";
import Game from "./Entity/Game";

// keeping this as an example of a class component in tsx

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
      <div className="current-game-list">
        {this.props.games.map((game, index) => {
          const currentGameProps: CurrentGameProps = {
            game: game,
            index: index,
            updateDisplayIndex: this.updateDisplayIndex,
          };
          return <CurrentGame {...currentGameProps} />;
        })}
      </div>
    );
  }
}
