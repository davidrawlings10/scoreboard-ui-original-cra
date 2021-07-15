// keeping this as an example of a class component in tsx

import React from "react";
import { Select, InputLabel, MenuItem, Input } from "@material-ui/core";
import styled from "styled-components";
import "./AddGameForm.css";

const Div = styled.form`
  background-color: white;
`;

export interface AddGameFormProps {}

interface Team {
  id: number;
  location: string;
  name: string;
}

export interface AddGameFormState {
  homeTeamId: number;
  awayTeamId: number;
  teams: Array<Team>;
}

// keeping this as an example of a class component

export default class AddGameForm extends React.Component<
  AddGameFormProps,
  AddGameFormState
> {
  constructor(props: AddGameFormProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const state: AddGameFormState = {
      homeTeamId: 33,
      awayTeamId: 34,
      teams: [],
    };

    this.state = state;
  }

  componentDidMount() {
    fetch("http://localhost:8080/team/getTeams?leagueId=2")
      .then((res) => res.json())
      .then((json) => this.setState({ teams: json.list }));
  }

  handleChange(event: React.ChangeEvent<any>) {
    const value = event.target.value;
    const name = event.target.name;

    // this.setState({ [name]: value });

    if ((name as string) === "homeTeamId") {
      this.setState({ homeTeamId: value });
    } else if ((name as string) === "awayTeamId") {
      this.setState({ awayTeamId: value });
    }
  }

  handleSubmit(event: React.ChangeEvent<any>) {
    fetch(
      "http://localhost:8080/game/startGame?sport=HOCKEY&homeTeamId=" +
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
