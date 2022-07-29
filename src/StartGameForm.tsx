// keeping this as an example of a class component in tsx

import React from "react";
import { Select, InputLabel, MenuItem, Button, Box } from "@material-ui/core";
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
      <Box display="flex" justifyContent="center" width="100%" margin={2}>
        <Box width="40%">
          <Form onSubmit={this.handleSubmit}>
            <Box margin={2}>
              <InputLabel id="labelHome">Home Team</InputLabel>
              <Select
                labelId="label"
                id="selectHome"
                name="homeTeamId"
                value={this.state.homeTeamId}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
              >
                {this.state.teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.location + " " + team.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box margin={2}>
              <InputLabel id="labelAway">Away Team</InputLabel>
              <Select
                labelId="label"
                id="selectAway"
                name="awayTeamId"
                value={this.state.awayTeamId}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
              >
                {this.state.teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.location + " " + team.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" margin={2}>
              <Button
                type="submit"
                value="Submit"
                variant="contained"
                color="primary"
              >
                Start Game
              </Button>
            </Box>
          </Form>
        </Box>
      </Box>
    );
  }
}
