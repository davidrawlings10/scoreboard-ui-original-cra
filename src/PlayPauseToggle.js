import React from 'react';
import './PlayPauseToggle.css';
import Button from '@material-ui/core/Button'

export default class PlayPauseToggle extends React.Component {
    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
      this.props.onChange();
    }
  
    render() {
      return (
        <Button onClick={this.handleChange} variant="contained" color="primary">
          {this.props.toggleValue ? 'ON' : 'OFF'}
        </Button>
      );
    }
  }