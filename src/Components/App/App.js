import React from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import CurrentUser from '../CurrentUser/CurrentUser';
import PlaylistList from '../PlaylistList/PlaylistList';
import Spotify from '../../util/Spotify';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: [],
      playlists: [],
      currentUser: null
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  }
  
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser !== null) {
      this.setState({currentUser: currentUser});
      this.getUserPlaylists();
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.currentUser === null && prevState.currentUser !== null) {
      this.getCurrentUser();
    }
  }

  getCurrentUser() {
    Spotify.currentUser().then(currentUser => {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.setState({ currentUser: currentUser });
      this.getUserPlaylists();
    });
  }

  getUserPlaylists() {
    Spotify.getPlaylists().then((playlists) => {
      this.setState({ playlists });
    });
  }

  selectPlaylist(playlistId, name) {
    Spotify.getPlaylist(playlistId).then((playlist) => {
      this.setState({ playlistName: name, playlistTracks: playlist });
    });
  }
  
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'Playlist Name',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then (searchResults => {
      this.setState({searchResults: searchResults})
      this.getUserPlaylists();
    });
  }


  render() {
    return (
      <div>
        <h1>Push<span className="highlight">Play</span>Listen</h1>
        <CurrentUser currentUser={this.state.currentUser} login={this.getCurrentUser} />
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} tracksInPlaylist={this.state.playlistTracks} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
          <PlaylistList playlists={this.state.playlists} selectPlaylist={this.selectPlaylist} />
        </div>
      </div>
    )
  }
}

export default App;
