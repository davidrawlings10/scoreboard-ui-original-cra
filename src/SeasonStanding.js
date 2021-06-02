import React from 'react';
import './SeasonStanding.css';
import TeamName from './TeamName';

export default class SeasonStanding extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        standings: []
      };
  }

  componentDidMount() {
    fetch("http://localhost:8080/standing/get?seasonId=1")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            standings: result.list
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

  calculatedPointPercentage(point, gp) {
    if (point == 0 || gp == 0) {
      return 0;
    }

    return (point / (gp * 2) * 100).toPrecision(3);
  }

  render() {
    const { error, isLoaded, standings } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <table className="Standing">
          <thead>
            <tr>
              <th></th>
              <th>Team</th>            
              <th title="Points">PTS</th>
              <th title="Win">W</th>
              <th title="Loss">L</th>
              <th title="Overtime Loss">OTL</th>
              <th title="Games Played">GP</th>
              <th title="Goals For">GF</th>
              <th title="Goals Against">GA</th>
              <th title="Goal Diff">GD</th>
              <th title="Home Point">HP</th>
              <th title="Home Win">HW</th>
              <th title="Home Loss">HL</th>
              <th title="Home Overtime Loss">HOTL</th>
              <th title="Away Point">AP</th>
              <th title="Away Win">AW</th>
              <th title="Away Loss">AL</th>
              <th title="Away Overtime Loss">AOTL</th>
              <th title="Point Percentage">PP</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => (
              <tr key={standing.id}>
                <td>{index + 1}</td>
                <td><TeamName id={standing.teamId}/></td>
                <td>{standing.point}</td>
                <td>{standing.win}</td>
                <td>{standing.loss}</td>
                <td>{standing.otloss}</td>
                <td>{standing.gp}</td>
                <td>{standing.gf}</td>
                <td>{standing.ga}</td>
                <td>{standing.gf - standing.ga}</td>
                <td>{standing.homePoint}</td>
                <td>{standing.homeWin}</td>
                <td>{standing.homeLoss}</td>
                <td>{standing.homeOtloss}</td>
                <td>{standing.awayPoint}</td>
                <td>{standing.awayWin}</td>
                <td>{standing.awayLoss}</td>
                <td>{standing.awayOtloss}</td>
                <td>{this.calculatedPointPercentage(standing.point, standing.gp)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to Head Outcome</div>
        </>
      )
    }
  }
}