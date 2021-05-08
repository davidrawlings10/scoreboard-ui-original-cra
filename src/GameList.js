import React from 'react'

class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            games: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8080/game/getGamesBySeasonId?seasonId=1")
            .then(res => res.json())
            .then(
                (games_) => {
                    this.setState({
                        isLoaded: true,
                        games: games_.list
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
            )
    }

    render() {
        const { error, isLoaded, games } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {games.map(game => (
                        <li key={game.id}>{game.homeTeamId} vs {game.awayTeamId}</li>
                    ))}
                </ul>
            )
        }
    }
}

export default GameList;