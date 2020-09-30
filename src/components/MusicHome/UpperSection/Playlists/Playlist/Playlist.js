import React from 'react';
import './Playlist.scss';

import PlaylistIcon from '../../../../../assets/icons/playlist.png';

const Playlist = props => (
  <div className="playlist">
    <div className="playlist-icon">
      <img className="playlist-img" src={PlaylistIcon} alt="" />
    </div>
    <div className="playlist-name">
      {props.name}
    </div>
  </div>
);

export default Playlist;
