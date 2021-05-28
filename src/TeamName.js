import React from 'react'

export default class TeamName extends React.Component {
    constructor(props) {
        super(props);

        this.state = {id: -1, name: '', location: ''};
    }

    async getTeamName(id) {
        var res = await fetch("http://localhost:8080/team/getTeamById?teamId="+id)
        var team = await res.json();
        return team;
    }

    setTeamName(id) {
        this.getTeamName(id)
        .then((team) =>
            this.setState({name: team.name, location: team.location})
        );
    }

    render() {
        if (this.props.id !== this.state.id) {
            this.setState({id: this.props.id});
            this.setTeamName(this.props.id);
        }

        
        console.log("this:"+this.state.location);

        if (this.state.location == null) {
            console.log("null")
        } else {            
            console.log("not null")
        }

        const location = !!this.state.location ? this.state.location + ' ' : '';
        const name = !!this.state.name ? this.state.name : '';

        return <span>{location + name}</span>;
    }
}