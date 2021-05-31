import React from 'react';
import './AddGame.css';

class AddGame extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch("http://localhost:8080/game/addGame?sportId=1&homeTeamId=47&awayTeamId=43")
        .then(
            alert("game added")
        )
    }

    render() {
        return (
            <button class="AddGame" onClick={this.handleClick}>
                Add Game
            </button>
        );
    }

    // return <a href="http://localhost:8080/game/startGame" className="Btn">{props.text}</a>
}

export default AddGame;