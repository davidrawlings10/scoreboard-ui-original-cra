import React from 'react';
import { Select, InputLabel, MenuItem, Input } from '@material-ui/core';
import './AddGameForm.css';

class AddGameForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {homeTeamId: 33, awayTeamId: 34, teams: []};

        /*this.teams = [{id: 33, name: 'Bruins'},
                      {id: 40, name: 'Red Wings'},
                      {id: 50, name: 'Avalanche'},
                      {id: 63, name: 'Sharks'}];*/
    }

    componentDidMount() {
        fetch("http://localhost:8080/team/get?leagueId=2").then(res => res.json()).then(json => this.setState({teams: json.list}));
        console.log(this.teams);
    }

    handleChange(event) {
        console.log("change - event.target.value:"+event.target.value);
        console.log("change - event.target.name:"+event.target.name);

        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        console.log("submit - homeTeamId:"+this.state.homeTeamId);
        fetch("http://localhost:8080/game/addGame?sportId=1&homeTeamId=" + this.state.homeTeamId + "&awayTeamId=" + this.state.awayTeamId);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <InputLabel id="labelHome">Home Team</InputLabel>
                <Select labelId="label" id="selectHome" name="homeTeamId" value={this.state.homeTeamId} onChange={this.handleChange}>
                    {this.state.teams.map(team => 
                        <MenuItem value={team.id}>{team.location + ' ' + team.name}</MenuItem>
                    )}
                </Select>
                <InputLabel id="labelAway">Away Team</InputLabel>
                <Select labelId="label" id="selectAway" name="awayTeamId" value={this.state.awayTeamId} onChange={this.handleChange}>
                    {this.state.teams.map(team => 
                        <MenuItem value={team.id}>{team.location + ' ' + team.name}</MenuItem>
                    )}
                </Select>
                <Input type="submit" value="Submit"/>
            </form>
        )
    }
}

export default AddGameForm;