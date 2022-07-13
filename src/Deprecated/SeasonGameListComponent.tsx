/*import React from "react";
import "./SeasonGameList.css";
import TeamDisplay from "../TeamDisplay";
import Game from "../Game";

export interface SeasonGameListProps {
  seasonId: number;
}

interface SeasonGameListState {
  error: any;
  isLoaded: boolean;
  games: Array<Game>;
  seasonId: number;
}

export default class SeasonGameList extends React.Component<
  SeasonGameListProps,
  SeasonGameListState
> {
  constructor(props: SeasonGameListProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      games: [],
      seasonId: 0,
    };
  }

  setSeasonGames(seasonId: number) {
    fetch(
      "http://192.168.68.129:8080/game/getGamesBySeasonId?seasonId=" +
        this.props.seasonId
    )
      .then((res) => res.json())
      .then(
        (games) => {
          this.setState({
            isLoaded: true,
            games: games.list,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    if (this.props.seasonId !== this.state.seasonId) {
      console.log("different");
      this.setState({ seasonId: this.props.seasonId });
      this.setSeasonGames(this.props.seasonId);
    } else {
      console.log("same");
    }

    const { error, isLoaded, games } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table className="SeasonGameList">
          <thead>
            <tr>
              <th>Home</th>
              <th></th>
              <th>Away</th>
              <th></th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>
                  <TeamDisplay id={game.homeTeamId} />
                </td>
                <td>{game.homeScore}</td>
                <td>
                  <TeamDisplay id={game.awayTeamId} />
                </td>
                <td>{game.awayScore}</td>
                <td>{game.endingPeriod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}
*/

export {};
