import React from 'react';
import './MyComponent.css';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
    }

    render() {
        return (
            <div addClass="Abcd">
                abc
            </div>
        )
    }
}

export default MyComponent;