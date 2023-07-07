// keeping this as an example of a class component in tsx

import React from "react";
import { Button, Box } from "@material-ui/core";

import SimpleSelect from "./Shared/SimpleSelect";
import TeamSelect from "./Shared/TeamSelect";
import { sfetchList } from "./sfetch";
import Team from "./Entity/Team";
import config from "./config";

interface StartGameFormClassProps {}

interface StartGameFormClassState {
  sport: string;
  homeLeague: string;
  awayLeague: string;
  homeTeamId: number;
  awayTeamId: number;
  homeLeagueTeamsList: Array<Team>;
  awayLeagueTeamsList: Array<Team>;
}

export default class StartGameFormClass extends React.Component<
  StartGameFormClassProps,
  StartGameFormClassState
> {
  constructor(props: StartGameFormClassProps) {
    super(props);

    this.sportChange = this.sportChange.bind(this);
    this.homeLeagueChange = this.homeLeagueChange.bind(this);
    this.awayLeagueChange = this.awayLeagueChange.bind(this);
    this.homeTeamIdChange = this.homeTeamIdChange.bind(this);
    this.awayTeamIdChange = this.awayTeamIdChange.bind(this);

    const state: StartGameFormClassState = {
      sport: "HOCKEY",
      homeLeague: "AVES",
      awayLeague: "AVES",
      homeTeamId: 1,
      awayTeamId: 2,
      homeLeagueTeamsList: [],
      awayLeagueTeamsList: [],
    };

    this.state = state;
  }

  componentDidMount() {
    this.updateTeamsList(this.state.homeLeague, true);
    this.updateTeamsList(this.state.awayLeague, false);
  }

  sportChange(sport: string) {
    this.setState({ sport: sport });
  }

  homeLeagueChange(league: string) {
    this.setState({ homeLeague: league });
    this.updateTeamsList(league, true);
  }

  awayLeagueChange(league: string) {
    this.setState({ awayLeague: league });
    this.updateTeamsList(league, false);
  }

  homeTeamIdChange(teamId: number) {
    this.setState({ homeTeamId: teamId });
  }

  awayTeamIdChange(teamId: number) {
    this.setState({ awayTeamId: teamId });
  }

  updateTeamsList(league: string, isHome: boolean) {
    sfetchList("/team/getTeams?league=" + league).then((list) => {
      if (isHome) {
        this.setState({ homeLeagueTeamsList: list, homeTeamId: list[0].id });
      } else {
        this.setState({ awayLeagueTeamsList: list, awayTeamId: list[0].id });
      }
    });
  }

  handleSubmit(event: React.ChangeEvent<any>) {
    fetch(
      `${config.baseUrl}/game/startSingleGame?sport=${this.state.sport}&homeTeamId=${this.state.homeTeamId}&awayTeamId=${this.state.awayTeamId}`
    );
    event.preventDefault();
  }

  render() {
    return (
      <Box display="flex" justifyContent="center" width="100%" margin={2}>
        <Box width={500}>
          <form onSubmit={this.handleSubmit}>
            <Box margin={2}>
              <SimpleSelect
                entity="sport"
                value={this.state.sport}
                onChange={this.sportChange}
              />
            </Box>
            <Box margin={2}>
              <SimpleSelect
                entity="league"
                value={this.state.homeLeague}
                onChange={this.homeLeagueChange}
              />
            </Box>
            <Box margin={2}>
              <TeamSelect
                teamList={this.state.homeLeagueTeamsList}
                onChange={this.homeTeamIdChange}
              />
            </Box>
            <Box margin={2}>
              <SimpleSelect
                entity="league"
                value={this.state.awayLeague}
                onChange={this.awayLeagueChange}
              />
            </Box>
            <Box margin={2}>
              <TeamSelect
                teamList={this.state.awayLeagueTeamsList}
                onChange={this.awayTeamIdChange}
              />
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
          </form>
        </Box>
      </Box>
    );
  }
}
