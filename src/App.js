import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.js';
import Playlist from './components/Playlist/Playlist';
import SearchResults from './components/SearchResults/SearchResults.js';
import Spotify from './util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlist: "Funky Jams",
      tracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.tracks.includes(track.id)) {
      const newTracks = this.state.tracks.concat(track)
      this.setState({
        tracks: newTracks
      });
    }
  }

  removeTrack(track) {
    if (this.state.tracks.includes(track.id)) {
      const newTracks = this.state.tracks.filter(trk => trk.id !== track.id);
      this.setState({tracks: newTracks})
    }
  }

  updatePlaylistName(name) {
    this.setState({
      playlist: name
    })
  }

  savePlaylist() {
    const trackURIs = this.state.tracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlist, trackURIs);
    this.setState({
      tracks: []
    });
    this.updatePlaylistName('New Playlist');
  }

  search(term) {
    Spotify.search(term).then(searchResults =>
    this.setState({
      searchResults: searchResults
    }));
  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
        </div>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist
          playlistName={this.state.playlist}
          playlistTracks={this.state.tracks}
          onRemove={this.removeTrack}
          onNameChange={this.updatePlaylistName}
          onSave={this.savePlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
