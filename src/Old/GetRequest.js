import React from 'react';

class GetRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalReactPackages: null,
            totalReactPackagesB: 123,
            abc: null,
            def: null
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        /*fetch('https://api.npms.io/v2/search?q=react')
            .then(response => response.json())
            .then(data => this.setState({ totalReactPackages: data.total }));*/
        /*fetch('http://localhost:8080/game/playSec')
            .then(response => response.json())
            .then(data => this.setState({
                totalReactPackages: data.homeScore,
                totalReactPackagesB: data.awayScore,
                abc: data.homeName,
                def: data.awayName
            }));*/
    }

    render() {
        const { totalReactPackages, totalReactPackagesB, abc, def } = this.state;
        return (
            <div>
            <div>
                <span>{abc}</span><span>{totalReactPackages}</span>
            </div>
            <div>
                <span>{def}</span><span>{totalReactPackagesB}</span>
            </div>
        </div>
        );
    }
}

export default GetRequest;