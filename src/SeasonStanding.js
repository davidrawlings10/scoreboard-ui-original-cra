import React from 'react';
import './SeasonStanding.css';

export default class SeasonStanding extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
  }

  componentDidMount() {
    fetch("http://localhost:8080/standing/get?seasonId=1")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.list
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
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <table className="Standing">
          <thead>
            <tr>
              <th>Team Id</th>
              <th title="Win">W</th>
              <th title="Loss">L</th>
              <th title="Overtime Loss">OTL</th>
              <th title="Points">PTS</th>
              <th title="Goals For">GF</th>
              <th title="Goals Against">GA</th>
              <th title="Games Played">GP</th>
              <th title="Home Win">HW</th>
              <th title="Home Win">HL</th>
              <th title="Away Win">AW</th>
              <th title="Away Loss">AL</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.teamId}</td>
                <td>{item.win}</td>
                <td>{item.loss}</td>
                <td>{item.otloss}</td>
                <td>{item.point}</td>
                <td>{item.gf}</td>
                <td>{item.ga}</td>
                <td>{item.gp}</td>
                <td>{item.homeWin}</td>
                <td>{item.homeLoss}</td>
                <td>{item.awayWin}</td>
                <td>{item.awayLoss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }
}