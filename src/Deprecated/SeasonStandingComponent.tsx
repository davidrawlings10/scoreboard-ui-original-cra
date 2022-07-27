/*import React from "react";
import "./SeasonStanding.css";
import TeamDisplay from "./TeamDisplay";
import Standing from "./Standing";

export interface SeasonStandingProps {
  seasonId: number;
}

interface SeasonStatingState {
  error: any;
  isLoaded: boolean;
  standings: Array<Standing>;
  seasonId: number;
}

export default class SeasonStanding extends React.Component<
  SeasonStandingProps,
  SeasonStatingState
> {
  constructor(props: SeasonStandingProps) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      standings: [],
      seasonId: 0,
    };
  }

  setSeasonStanding(seasonId: number) {
    fetch(config.baseUrl + "/standing/get?seasonId=" + seasonId)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            standings: result.list,
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

  calculatedPointPercentage(point: number, gp: number) {
    if (point === 0 || gp === 0) {
      return 0;
    }

    return ((point / (gp * 2)) * 100).toPrecision(3);
  }

  render() {
    if (this.props.seasonId !== this.state.seasonId) {
      console.log("different");
      this.setState({ seasonId: this.props.seasonId });
      this.setSeasonStanding(this.props.seasonId);
    } else {
      console.log("same");
    }

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
                <th title="Home Points">HPTS</th>
                <th title="Home Win">HW</th>
                <th title="Home Loss">HL</th>
                <th title="Home Overtime Loss">HOTL</th>
                <th title="Home Games Played">HGP</th>
                <th title="Away Poinst">APTS</th>
                <th title="Away Win">AW</th>
                <th title="Away Loss">AL</th>
                <th title="Away Overtime Loss">AOTL</th>
                <th title="Away Games Played">AGP</th>
                <th title="Point Percentage">PP</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing, index: number) => (
                <tr key={standing.id}>
                  <td>{index + 1}</td>
                  <td>
                    <TeamDisplay id={standing.teamId} />
                  </td>
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
                  <td>{standing.homeGp}</td>
                  <td>{standing.awayPoint}</td>
                  <td>{standing.awayWin}</td>
                  <td>{standing.awayLoss}</td>
                  <td>{standing.awayOtloss}</td>
                  <td>{standing.awayGp}</td>
                  <td>
                    {this.calculatedPointPercentage(
                      standing.point,
                      standing.gp
                    )}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tiebreaker">
            Tiebreaker decided by Points, Wins, Goal Diff, Goals For, Head to
            head outcome, Two game playoff
          </div>
        </>
      );
    }
  }
}
*/

export {};
