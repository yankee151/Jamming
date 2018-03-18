import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);

    event.preventDefault();
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value="New Playlist"/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
        </div>
    )
  }
}

export default Playlist;
