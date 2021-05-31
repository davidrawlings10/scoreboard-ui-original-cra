import React from 'react'

export default class ClockDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {game} = this.props;
        return <span>{game.clock.final ? "Final" : ""} {game.clock.minutes}:{('0' + game.clock.seconds).slice(-2)} {game.clock.period} {game.clock.intermission ? "Intermission" : "Period"}</span>
    }
}