// keeping this as an example of a class component in tsx

import React from "react";
import { Select, InputLabel, MenuItem, Button, Box } from "@material-ui/core";

import config from "./config";
import { sfetchList } from "./sfetch";
import Team from "./Entity/Team";
import styled from "styled-components";
import TeamDisplay from "./Shared/TeamDisplay/TeamDisplay";
import SimpleSelect from "./Shared/SimpleSelect";

export interface StartGameFormProps {}

export interface StartGameFormState {
  leagues: Array<object>;
  homeLeague: string;
  homeLeagueSimple: string;
  homeTeamId: number;
  homeLeagueTeamsList: Array<Team>;
  awayLeague: string;
  awayTeamId: number;
  awayLeagueTeamsList: Array<Team>;
}

// keeping this as an example of a class component

export default class StartGameForm extends React.Component<
  StartGameFormProps,
  StartGameFormState
> {
  constructor(props: StartGameFormProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.homeLeagueChange = this.homeLeagueChange.bind(this);

    const state: StartGameFormState = {
      leagues: [],
      homeLeague: "AVES",
      homeLeagueSimple: "",
      homeTeamId: 1,
      homeLeagueTeamsList: [],
      awayLeague: "AVES",
      awayTeamId: 2,
      awayLeagueTeamsList: [],
    };

    this.state = state;
  }

  componentDidMount() {
    sfetchList("/season/getLeagues").then((list) =>
      this.setState({ leagues: list })
    );

    this.loadTeams(this.state.homeLeague).then((teams) =>
      this.setState({ homeLeagueTeamsList: teams, homeTeamId: teams[0].id })
    );
    this.loadTeams(this.state.awayLeague).then((teams) =>
      this.setState({ awayLeagueTeamsList: teams, awayTeamId: teams[1].id })
    );
  }

  homeLeagueChange(league: string) {
    this.setState({ homeLeagueSimple: league });
  }

  handleSelectChange(event: React.ChangeEvent<any>) {
    const value = event.target.value;
    const name = event.target.name;

    if ((name as string) === "homeLeague") {
      this.setState({ homeLeague: value });
      this.loadTeams(value).then((teams) =>
        this.setState({ homeLeagueTeamsList: teams, homeTeamId: teams[0].id })
      );
    } else if ((name as string) === "homeTeamId") {
      this.setState({ homeTeamId: value });
    } else if ((name as string) === "awayLeague") {
      this.setState({ awayLeague: value });
      this.loadTeams(value).then((teams) =>
        this.setState({ awayLeagueTeamsList: teams, awayTeamId: teams[1].id })
      );
    } else if ((name as string) === "awayTeamId") {
      this.setState({ awayTeamId: value });
    }
  }

  loadTeams(league: string) {
    return fetch(config.baseUrl + "/team/getTeams?league=" + league)
      .then((res) => res.json())
      .then((json) => json.list);
  }

  handleSubmit(event: React.ChangeEvent<any>) {
    fetch(
      config.baseUrl +
        "/game/startSingleGame?sport=HOCKEY&homeTeamId=" +
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
        <Box width={500}>
          <Form onSubmit={this.handleSubmit}>
            <Box margin={2}>
              <InputLabel>Home League</InputLabel>
              <Select
                name="homeLeague"
                value={this.state.homeLeague}
                onChange={this.handleSelectChange}
                variant="outlined"
                fullWidth
              >
                {this.state.leagues &&
                  this.state.leagues.map((league: any) => (
                    <MenuItem id={league} value={league} key={league}>
                      {league}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
            <Box margin={2}>
              <SimpleSelect
                entity="league"
                value={this.state.homeLeagueSimple}
                onChange={this.homeLeagueChange}
              />
            </Box>
            <Box margin={2}>
              <InputLabel id="labelHome">Home Team</InputLabel>
              <Select
                labelId="label"
                id="selectHome"
                name="homeTeamId"
                value={this.state.homeTeamId}
                onChange={this.handleSelectChange}
                variant="outlined"
                fullWidth
              >
                {this.state.homeLeagueTeamsList.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    <TeamDisplay id={team.id} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box margin={2}>
              <InputLabel>Away League</InputLabel>
              <Select
                name="awayLeague"
                value={this.state.awayLeague}
                onChange={this.handleSelectChange}
                variant="outlined"
                fullWidth
              >
                {this.state.leagues &&
                  this.state.leagues.map((league: any) => (
                    <MenuItem id={league} value={league} key={league}>
                      {league}
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
                onChange={this.handleSelectChange}
                variant="outlined"
                fullWidth
              >
                {this.state.awayLeagueTeamsList.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    <TeamDisplay id={team.id} />
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
