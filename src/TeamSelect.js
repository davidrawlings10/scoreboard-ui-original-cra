import React from 'react'

export default class TeamSelect extends React.Component {
    constructor(props) {
        super(props);

        this.teams = [{id: 33, name: 'Bruins'},
                      {id: 40, name: 'Red Wings'},
                      {id: 50, name: 'Avalanche'},
                      {id: 63, name: 'Sharks'}];
    }
    
    render() {
        return (
            <Select labelId="label" id="selectAway" name="awayTeamId" value={this.state.awayTeamId} onChange={this.handleChange}>
                {this.teams.map(team => 
                    <MenuItem value={team.id}>{team.name}</MenuItem>
                )}
            </Select>
        )
    }

}