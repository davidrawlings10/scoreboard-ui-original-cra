import React from 'react';
import './Toggle.css';
import Button from '@material-ui/core/Button'

class Toggle extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {isToggleOn: false};
  
      this.handleChange = this.handleChange.bind(this);
    }
  
    /*handleClick() {
      if (!this.state.isToggleOn) {
        fetch("http://localhost:8080/game/playGames")
      } else {
        fetch("http://localhost:8080/game/pauseGames")
      }
      this.setState(state => ({
        isToggleOn: !state.isToggleOn
      }));
    }*/

    handleChange(e) {
      this.props.onChange();
    }
  
    render() {
      return (
        <Button varient="contained" color="primary" onClick={this.handleChange}>
          {this.props.value ? 'ON' : 'OFF'}
        </Button>
      );
    }
  }

  export default Toggle;