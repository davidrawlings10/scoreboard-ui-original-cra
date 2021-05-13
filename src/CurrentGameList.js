import React from 'react';
import CurrentGame from './CurrentGame';
import './CurrentGameList.css'

class CurrentGameList extends React.Component {
  constructor(props) {
    super(props);
    this.updateDisplayIndex = this.updateDisplayIndex.bind(this);
  }

  updateDisplayIndex(index) {
      this.props.updateDisplayIndex(index);
  }

  render() {
    if (this.props.games != null) {
      return (
        <div class="current-game-list" /*onClick={this.updateDisplayIndex}*/>
          {this.props.games.map((game, index) => <CurrentGame game={game} index={index} updateDisplayIndex={this.updateDisplayIndex}/>)}
        </div>
      );
    } else {
      return (<div>waiting for games...</div>)
    }
  }
}

export default CurrentGameList;