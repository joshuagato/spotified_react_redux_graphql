import React, { Component } from 'react';
import './Playlists.scss';

import Playlist from './Playlist/Playlist';
import Auxil from '../../../Auxil/Auxil';

class Playlists extends Component {
  render() {
    return (
      <Auxil>
        <div className="playlists-heading">
          <h1 className="playlist-heading">PLAYLISTS</h1>
          <button className="new-playlist-button">NEW PLAYLIST</button>
        </div>
        <div className="playlists">
          <Playlist name="Playlist 1" />
          <Playlist name="Playlist 1" />
          <Playlist name="Playlist 1" />
          <Playlist name="Playlist 1" />
          <Playlist name="Playlist 1" />
          <Playlist name="Playlist 1" />
          <Playlist name="Playlist 1" />
        </div>
      </Auxil>
    );
  }
}

export default Playlists;