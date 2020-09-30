import React from 'react';
import './Album.scss';
// import * as AlbArts from '../../../../../assets/artwork/';
// var base64Img = require('base64-img');
// import Img from 'react-image';
// import Image from 'react-render-image';

const Album = props => (
  <div className="album-container" onClick={() => props.clicked(props.albumId, props.artistId)}>
    <div className="album-pic">
      <img className="playlist-img" src={process.env.REACT_APP_SERVER_ARTWORK_URL + props.pic} alt="" />
    </div>
    <div className="album-name">
      {props.name}
    </div>
  </div>
);

export default Album;