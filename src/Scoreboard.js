import { isInaccessible } from '@testing-library/dom';
import React from 'react';
import './Scoreboard.css';

class Scoreboard extends React.Component {
    constructor(props) {
        super(props);
        /*this.state = {
          error: null,
          isLoaded: false,
          homeName: null,
          awayName: null,
          homeScore: null,
          awayScore: null,
          period: null,
          minutes: null,
          seconds: null,
          intermission: null
        };*/
    }

    /*componentDidMount() {
      this.timerId = setInterval(() => this.getGames(), 1000);
    }
    
    componentWillUnmount() {
      clearInterval(this.timerId, 1000);
    }

    getGames() {
      fetch("http://localhost:8080/game/getGames")
        .then(res => res.json())
        .then(json => json.list[0])
        .then(
          (game) => {
          // console.log("game:" + game + ", gameclock.minutes:" + game.clock.minutes + ", game.clock.seconds:" + game.clock.seconds);
            this.setState({
              isLoaded: true,
              homeName: game.homeName,
              awayName: game.awayName,
              homeScore: game.homeScore,
              awayScore: game.awayScore,
              period: game.clock.period,
              minutes: game.clock.minutes,
              seconds: game.clock.seconds,
              intermission: game.clock.intermission              
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }*/

    render() {
        const { error, isLoaded, homeName, awayName, homeScore, awayScore, period, minutes, seconds, intermission, final } = this.props;
        /*if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
                        <div style="background-color: blue"></div>
                        <div style="background-color: red"></div>
          */
          return (
            <div class="scoreboard">
              <div class="scoreboard-color" /*style="background-color: blue"*/></div>
              <div class="scoreboard-home-team">{homeName}</div>
              <div class="scoreboard-home-score">{homeScore}</div>
              <div class="scoreboard-color" /*style="background-color: red"*/></div>
              <div class="scoreboard-away-team">{awayName}</div>
              <div class="scoreboard-away-score">{awayScore}</div>
              <div class="scoreboard-time">{final ? "Final" : ""} {minutes}:{seconds} {period} {intermission ? "Intermission" : "Period"}</div>
            </div>
          )
        // }
    }
}

export default Scoreboard;