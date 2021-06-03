import React from "react";
import TeamName from "./TeamName";
import "./SeasonGameList.css";

export default class SeasonGameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      games: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/game/getGamesBySeasonId?seasonId=1")
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
                  <TeamName id={game.homeTeamId} />
                </td>
                <td>{game.homeScore}</td>
                <td>
                  <TeamName id={game.awayTeamId} />
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
