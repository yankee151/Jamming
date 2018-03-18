import React, { Component } from 'react';

class Track extends Component {
  constructor(props) {
    super(props)

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack(event) {
    this.props.onAdd(this.props.track);

    event.preventDefault();
  }
  removeTrack(event) {
    this.props.onRemove(this.props.track);

    event.preventDefault();
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist}</p> | <p>{this.props.album}</p>
        </div>
        <a className="Track-action" onClick={this.addTrack}>+</a>
        <a className="Track-action" onClick={this.removeTrack}>-</a>
      </div>
    )
  }
}

export default Track;
