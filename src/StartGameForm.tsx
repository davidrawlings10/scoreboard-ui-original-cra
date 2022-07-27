// keeping this as an example of a class component in tsx

import React from "react";
import { Select, InputLabel, MenuItem, Input } from "@material-ui/core";
// import { styled } from "@material-ui/core/styles";

import config from "./config";
import Team from "./Entity/Team";
import styled from "styled-components";

export interface StartGameFormProps {}

export interface StartGameFormState {
  homeTeamId: number;
  awayTeamId: number;
  teams: Array<Team>;
}

// keeping this as an example of a class component

export default class StartGameForm extends React.Component<
  StartGameFormProps,
  StartGameFormState
> {
  constructor(props: StartGameFormProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const state: StartGameFormState = {
      homeTeamId: 33,
      awayTeamId: 34,
      teams: [],
    };

    this.state = state;
  }

  componentDidMount() {
    fetch(config.baseUrl + "/team/getTeams?leagueId=2")
      .then((res) => res.json())
      .then((json) => this.setState({ teams: json.list }));
  }

  handleChange(event: React.ChangeEvent<any>) {
    const value = event.target.value;
    const name = event.target.name;

    if ((name as string) === "homeTeamId") {
      this.setState({ homeTeamId: value });
    } else if ((name as string) === "awayTeamId") {
      this.setState({ awayTeamId: value });
    }
  }

  handleSubmit(event: React.ChangeEvent<any>) {
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
    const Form = styled.form`
      color: white;
    `;

    return (
      <Form onSubmit={this.handleSubmit}>
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
            <MenuItem key={team.id} value={team.id}>
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
            <MenuItem key={team.id} value={team.id}>
              {team.location + " " + team.name}
            </MenuItem>
          ))}
        </Select>
        <Input type="submit" value="Submit" />
      </Form>
    );
  }
}
