import React from "react";
import { Select, InputLabel, MenuItem, Input } from "@material-ui/core";
import "./AddGameForm.css";

export default class AddGameForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = { homeTeamId: 33, awayTeamId: 34, teams: [] };
  }

  componentDidMount() {
    fetch(config.baseUrl + "/team/getTeams?leagueId=2")
      .then((res) => res.json())
      .then((json) => this.setState({ teams: json.list }));
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    fetch(
      config.baseUrl +
        "/game/startGame?sport=HOCKEY&homeTeamId=" +
        this.state.homeTeamId +
        "&awayTeamId=" +
        this.state.awayTeamId
    );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputLabel id="labelHome">Home Team</InputLabel>
        <Select
          labelId="label"
          id="selectHome"
          name="homeTeamId"
          value={this.state.homeTeamId}
          onChange={this.handleChange}
          variant="outlined"
        >
          {this.state.teams.map((team) => (
            <MenuItem value={team.id}>
              {team.location + " " + team.name}
            </MenuItem>
          ))}
        </Select>
        <InputLabel id="labelAway">Away Team</InputLabel>
        <Select
          labelId="label"
          id="selectAway"
          name="awayTeamId"
          value={this.state.awayTeamId}
          onChange={this.handleChange}
          variant="outlined"
        >
          {this.state.teams.map((team) => (
            <MenuItem value={team.id}>
              {team.location + " " + team.name}
            </MenuItem>
          ))}
        </Select>
        <Input type="submit" value="Submit" />
      </form>
    );
  }
}
