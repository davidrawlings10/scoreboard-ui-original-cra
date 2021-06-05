import React from "react";
import Season from "./Season";
import { Button, Select, InputLabel, MenuItem } from "@material-ui/core";

export default class SeasonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonId: 1,
      /*seasons: [
        { id: 1, description: "NHL 6/2/21 1" },
        { id: 30, description: "Aves 6/4/21 30" },
        { id: 63, description: "NHL 6/4/21 63" },
      ],*/
    };
    this.scheduleNewSeason = this.scheduleNewSeason.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8080/season/getSeasons")
      .then((res) => res.json())
      .then((json) => this.setState({ seasons: json.list }));
  }

  scheduleNewSeason() {
    fetch(
      "http://localhost:8080/season/schedule?scheduleType=ROUNDS&sport=HOCKEY&leagueId=2&numGames=4"
    );
    /*fetch(
      "http://localhost:8080/season/schedule?scheduleType=HOME_ROTATION&sport=HOCKEY&leagueId=2"
    );*/
  }

  handleSeasonChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.scheduleNewSeason}
          variant="contained"
          color="primary"
        >
          Schedule New Season
        </Button>
        <InputLabel id="labelSeason">Season</InputLabel>
        <Select
          labelId="label"
          id="selectSeason"
          name="seasonId"
          value={this.state.seasonId}
          onChange={this.handleSeasonChange}
        >
          {this.state.seasons?.map((season) => (
            <MenuItem value={season.id}>{season.id}</MenuItem>
          ))}
        </Select>
        <Season seasonId={this.state.seasonId} />
      </div>
    );
  }
}
