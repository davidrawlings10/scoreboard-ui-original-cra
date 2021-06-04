import React from "react";
import { searchCacheForTeam, cacheTeam } from "./TeamDisplayCache";

export default class TeamDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: -1, name: "", location: "" };
  }

  /*
    WORKING EXAMPLE OF getTeamName() WITH ONLY PROMISE AND NOT ASYNC/AWAIT
    getTeamName(id) {
        return new Promise((callback) => {
          fetch("http://localhost:8080/team/getTeamById?teamId="+id)
          .then(res => res.json())
          .then(team => {
            callback(team.name);
          });
        });
    }*/

  async getTeamName(id) {
    var res = await fetch(
      "http://localhost:8080/team/getTeamById?teamId=" + id
    );
    var team = await res.json();
    return team;
  }

  setTeamName(id) {
    const team = searchCacheForTeam(id);

    // if team is found in the cache then update state according to cached team object
    if (!!team) {
      this.setState({ name: team.name, location: team.location });
      return;
    }

    // if team is not found in the cache then call the back end to get team object and then cache for next time
    this.getTeamName(id).then((team) => {
      this.setState({ name: team.name, location: team.location });
      cacheTeam(id, team);
    });
  }

  render() {
    if (this.props.id !== this.state.id) {
      this.setState({ id: this.props.id });
      this.setTeamName(this.props.id);
    }

    const location =
      !this.props.hideLocation && !!this.state.location
        ? this.state.location + " "
        : "";
    const name = !!this.state.name ? this.state.name : "";

    return <span>{location + name}</span>;
  }
}
