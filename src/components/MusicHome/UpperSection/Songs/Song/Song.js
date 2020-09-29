import React from 'react';
import './Song.scss';
import Play from '../../../../../assets/icons/play-white.png';
import Options from '../../../../../assets/icons/more.png';

const Song = props => (
  <div className="single-song">
    <div className="left-section">
      <span className="number">{props.number}</span>
      <span className="play-button" onClick={props.clicked.bind(this, props.id)}><img src={Play} alt="" /></span>
    </div>
    <div className="middle-section">
      <p className="title">{props.title}</p>
      <p className="artist">{props.artist}</p>
    </div>
    <div className="options-section">
      <img src={Options} alt="options" />
    </div>
    <div className="right-section">
      <span>{props.duration}</span>
    </div>
  </div>
);

export default Song;
