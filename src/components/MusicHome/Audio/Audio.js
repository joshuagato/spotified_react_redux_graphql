import { Component } from 'react';
// import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Audio extends Component {
  constructor(props) {
    super(props);

    window.$currentPlaylist = [];
    window.$shufflePlaylist = [];
    window.$tempPlaylist = [];
    window.$currentIndex = 0;
    window.$timer = '';

    this.setAudioToPlay = track => {
      this.props.onSetCurentlyPlaying(track);
      this.props.audio.src = process.env.REACT_APP_SERVER_MUSIC_URL + track.path;
    };

    this.setTrack = (track, newPlaylist, play) => {
      if (newPlaylist !== window.$currentPlaylist) {

        window.$currentPlaylist = newPlaylist;
        window.$shufflePlaylist =  window.$currentPlaylist.slice();
        this.shuffleArray(window.$shufflePlaylist);
      }

      if (this.props.shuffle === true) window.$currentIndex = window.$shufflePlaylist.indexOf(track);
      else window.$currentIndex = window.$currentPlaylist.indexOf(track);

      this.pause();
      this.setAudioToPlay(track);

      if (play) this.play();
    };
    
    this.props.audio.addEventListener('ended', () => {
      this.playNextSong();
    });

    this.play = () => {
      this.props.onPlay();
      this.props.audio.play();
    };
    this.pause = () => {
      this.props.onPause();
      this.props.audio.pause();
    };

    this.playPreviousSong = () => {
      if(this.props.audio.currentTime >= 3 || window.$currentIndex === 0) this.setTime(0);
      else {
        window.$currentIndex -= 1;

        const trackToPlay = this.props.shuffle ? window.$shufflePlaylist[window.$currentIndex] : window.$currentPlaylist[window.$currentIndex];
        this.setTrack(trackToPlay, window.$currentPlaylist, true);
      }
    }

    this.playNextSong = () => {
      if (this.props.repeat) {
        this.setTime(0);
        this.play();
        return;
      }

      if (window.$currentIndex === window.$currentPlaylist.length - 1) {
        window.$currentIndex = 0;
      }
      else {
        window.$currentIndex += 1;
      }

      const trackToPlay = this.props.shuffle ? window.$shufflePlaylist[window.$currentIndex] : window.$currentPlaylist[window.$currentIndex];
      this.setTrack(trackToPlay, window.$currentPlaylist, true);
    }

    this.setMute = () => {
      this.props.audio.muted = !this.props.audio.muted;
    }

    this.setTime = seconds => {
      this.props.audio.currentTime = seconds;
    };
    
    this.shuffleArray = a => {
      var j, x, i;
      for(i = a.length; i; i--){
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
    };

    this.formatTime = seconds => {
      let time = Math.round(seconds);
      let minutes = Math.floor(time / 60);
      seconds = time - (minutes * 60);

      let extraZero = (seconds < 10) ? "0" : "";

      return minutes + ":" + extraZero + seconds;
    }
  }

  render() {
    return (null);
  }
}

const mapStateToProps = state => {
  return {
    audio: state.musPlay.audio,
    shuffle: state.musPlay.shuffle,
    repeat: state.musPlay.repeat
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onPlay: () => dispatch(actions.trackPlaying()),
    onPause: () => dispatch(actions.trackPaused()),
    onSetCurentlyPlaying: track => dispatch(actions.setCurentlyPlaying(track))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(Audio);