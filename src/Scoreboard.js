import { isInaccessible } from '@testing-library/dom';
import React from 'react';
import './Scoreboard.css';
// import getTeamName from './TeamNameCache'
import TeamName from './TeamName';

class Scoreboard extends React.Component {

  /*homeName = '';
  awayName = '';*/

  constructor(props) {
    super(props);

    this.state = {lastHomeTeamId: null, lastAwayTeamId: null, homeName: '', awayName: ''}

    if (!this.props.game) {
      return;
    }

    /*fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.homeTeamId)
    .then(res => res.json())
    .then(team => {
      this.homeName = team.name;
    });

    fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.awayTeamId)
    .then(res => res.json())
    .then(team => {
      this.awayName = team.name;
    });*/

    // this.setTeamNames();
  }

  /*setTeamNames() {
    // getTeamName(this.props.game.homeTeamId).then(res => this.setState({homeName: res}));
    // getTeamName(this.props.game.awayTeamId).then(res => this.setState({awayName: res}));

    console.log("!this.props.game"+!this.props.game);

    if (!this.props.game) {
      return;
    }

    console.log("this.props.game.homeTeamId"+this.props.game.homeTeamId);

    fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.homeTeamId)
    .then(res => res.json())
    .then(team => {
        this.setState({homeName: team.name})
    });

    fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.awayTeamId)
    .then(res => res.json())
    .then(team => {
        this.setState({awayName: team.name})
    });
  }*/

  /*setTeamNames() {
    getTeamName(this.props.game.homeTeamId).then(res => this.setState({homeName: res}));
    getTeamName(this.props.game.awayTeamId).then(res => this.setState({awayName: res}));
  }*/

  /*setTeamNames() {
    fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.homeTeamId)
      .then(res => res.json())
      .then(team => {
        this.setState({homeName: team.name});
      });
  }*/

  /*class teamNameUtil {
    constructor(id, name) {
      this.id = id;
      this.name;
    }

    getTeamNameIfNecessary(id) {
      if (id === this.id) {
        return this.name
      } else {
        fetch("http://localhost:8080/team/getTeamById?teamId="+id)
        .then(res => res.json())
        .then(team => {
          this.id = id;
          this.name = name;
          return name;
        });
      }
    }
  }*/

  /*setTeamNames() {
    fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.homeTeamId)
      .then(res => res.json())
      .then(team => {
        this.setState({homeName: team.name});
      });
  
      fetch("http://localhost:8080/team/getTeamById?teamId="+this.props.game.awayTeamId)
      .then(res => res.json())
      .then(team => {
        this.setState({awayName: team.name});
      });
  }*/


  /*getTeamName = (id) => { new Promise((callback) => {
      fetch("http://localhost:8080/team/getTeamById?teamId="+id)
      .then(res => res.json())
      .then(team => {
        callback(team.name);
      });
    });
  }*/

  /*getTeamName = new Promise((callback) => {
    fetch("http://localhost:8080/team/getTeamById?teamId="+1)
    .then(res => res.json())
    .then(team => {
      callback(team.name);
    });
  });*/

  /* GOOD EXAMPLE
  getTeamName(id) {
    return new Promise((callback) => {
      fetch("http://localhost:8080/team/getTeamById?teamId="+id)
      .then(res => res.json())
      .then(team => {
        callback(team.name);
      });
    });
  }*/

  /*async getTeamName(id) {
    var res = await fetch("http://localhost:8080/team/getTeamById?teamId="+id)
    var team = await res.json();
    return team.name;
  }

  setTeamNames(game) {
    if (game.homeTeamId !== this.state.lastHomeTeamId) {
      this.getTeamName(game.homeTeamId).then(res => {
        this.setState({lastHomeTeamId: game.homeTeamId, homeName: res});
      })
    }

    if (game.awayTeamId !== this.state.lastAwayTeamId) {
      this.getTeamName(game.awayTeamId).then(res => {
        this.setState({lastAwayTeamId: game.awayTeamId, awayName: res});
      })
    }
  }*/

  render() {
    const {game} = this.props;

    if (game != null) {

      // this.setTeamNames(game);

      /*if (game.homeTeamId !== this.state.lastHomeTeamId) {
        // this.setTeamNames();
        this.getTeamName(game.homeTeamId).then(res => {
          this.setState({lastHomeTeamId: game.homeTeamId, homeName: res});
        })
      }

      if (game.awayTeamId !== this.state.lastAwayTeamId) {
        // this.setTeamNames();
        this.getTeamName(game.awayTeamId).then(res => {
          this.setState({lastAwayTeamId: game.awayTeamId, awayName: res});
        })
      }*/

      return (
        <div class="scoreboard">
          <div class="scoreboard-color" /*style="background-color: blue"*/></div>
          <div class="scoreboard-home-team"><TeamName id={game.homeTeamId}/></div>
          <div class="scoreboard-home-score">{game.homeScore}</div>
          <div class="scoreboard-color" /*style="background-color: red"*/></div>
          <div class="scoreboard-away-team"><TeamName id={game.awayTeamId}/></div>
          <div class="scoreboard-away-score">{game.awayScore}</div>
          <div class="scoreboard-time">{game.clock.final ? "Final" : ""} {game.clock.minutes}:{game.clock.seconds} {game.clock.period} {game.clock.intermission ? "Intermission" : "Period"}</div>
        </div>
      )
    } else {
      return (<div>Waiting for a game...</div>);
    }      
  }
}

export default Scoreboard;