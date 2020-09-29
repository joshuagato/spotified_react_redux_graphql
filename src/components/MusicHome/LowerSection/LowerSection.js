import React, { Component } from 'react';
import './LowerSection.scss';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { findDOMNode } from 'react-dom';

import shuffleInactive from '../../../assets/icons/shuffle.png';
import shuffleActive from '../../../assets/icons/shuffle-active.png';
import repeatInactive from '../../../assets/icons/repeat.png';
import repeatActive from '../../../assets/icons/repeat-active.png';
import volumeInactive from '../../../assets/icons/volume-mute.png';
import volumeActive from '../../../assets/icons/volume.png';
import previous from '../../../assets/icons/previous.png';
import play from '../../../assets/icons/play.png';
import pause from '../../../assets/icons/pause.png';
import next from '../../../assets/icons/next.png';

import ControlButtons from './ControlButtons/ControlButtons';
import Audio from '../Audio/Audio';
import * as actions from '../../../store/actions/index';

class LowerSection extends Component {

  constructor(props) {
    super(props);

    this.mouseDown = false;
    this.audioInstance = React.createRef();
  }

  componentDidMount() {
    this.props.onSetInitialPlaylistToAllSongs();
    const thisComponent = this;

    // Prevent the control buttons from getting highlighted when dragged
    const musicPlayerContainer = this.refs.musicPlayer;
    musicPlayerContainer.addEventListener('mousedown', this.preventBehaviour);
    musicPlayerContainer.addEventListener('mousemove', this.preventBehaviour);
    
    // THE VOLUME CONTROL BAR
    const volumeBarCotainer = this.refs.volumeBarCotainer;

    const propsAudio = this.props.audio;
    // console.log("DID-MOUNT-props.audio", propsAudio)
    volumeBarCotainer.addEventListener('mousedown', function() {
      this.mouseDown = true;
    });
    volumeBarCotainer.addEventListener('mousemove', function(event) {
      if (this.mouseDown) {
        const percentage = event.offsetX / this.clientWidth;

        if (percentage >= 0 && percentage <= 1) propsAudio.volume = percentage;
      }
    });
    volumeBarCotainer.addEventListener('mouseup', function(event) {
      if (this.mouseDown) {
        const percentage = event.offsetX / this.clientWidth;
        this.mouseDown = false;

        if (percentage >= 0 && percentage <= 1) propsAudio.volume = percentage;
      }
    });
    document.addEventListener('mouseup', function() {
        this.mouseDown = false;
    });


    this.props.audio.addEventListener('volumechange', function() {
      thisComponent.updateVolumeProgressBar(this);
    });

    this.updateVolumeProgressBar = audio => {
      const volumeBar = this.refs.volumeBar;

      const volume = audio.volume * 100;
      volumeBar.style.width = volume + '%';
    }
    // console.log("DID-MOUNT-audioInstance.current", this.audioInstance.current.props.audio)
    // console.log("DID-MOUNT-props.audio", this.props.audio)
  }

  componentDidUpdate(prevProps, _) {
    const thisComponent = this;

    if (prevProps.songs !== this.props.songs) {
      const newPlaylist = this.props.songs;
      this.audioInstance.current.setTrack(newPlaylist[0], newPlaylist, false);
    }

    if (prevProps.currentlyPlaying.id !== this.props.currentlyPlaying.id) {
      // WE NEED TO FIX A BUG IN THE CURRENTLYPLAYING PROPS AND THEN PUT THE CANPLAY AUTO FUNCTION HERE
      // THE CURRENTLYPLAYING PROPS CHANGES WHEN WE ENTER AN ALBUM, BUT IF A TRACK WAS PLAYING BEFORE WE ENTERED,
      // IT DOES NOT STOP PLAYING, ALTHOUGH THE CURRPLAYN STATE CHANAGES; AND DUE TO THAT THE PLAYING BAR KEEPS
      // UPDATING ITS VALUES EACH SECONDS, BUT DOES NOT REFLECT THE TRACK LOADED IN THE BOTTOM LEFT PANEL
      // MAYBE WE HAVE TO BIND THE CURRPLAYN PROP TO this.props.audio OBJECT

      // This executes each each time there is a component update that affects the currentlyPlaying global state
      this.props.audio.addEventListener('canplay', () => {
        let duration = this.audioInstance.current.formatTime(this.props.audio.duration);

        const timeRemaining = this.refs.timeRemaining;
        timeRemaining.innerHTML = duration;
      });
    }
      
    // THE MUSIC PLAYER PROGRESS BAR
    const progressBarContainer = this.refs.progressBarContainer;
    // If we use anonymous arrow function, 'this' will refer to the <LowerSection /> component
    // However, using the conventional anonymous function, makes 'this' refer the the dom element
    // calling addEventListerner, which is the one with ref 'progressBarContainer, which is a div
    progressBarContainer.addEventListener('mousedown', function() {
      this.mouseDown = true;
    });
    progressBarContainer.addEventListener('mousemove', function(event) {
      if (this.mouseDown === true) {
        thisComponent.timeFromOffset(event, this);
      }
    });
    progressBarContainer.addEventListener('mouseup', function(event) {
      thisComponent.timeFromOffset(event, this);
      this.mouseDown = false;
    });
    document.addEventListener('mouseup', function() {
      this.mouseDown = false;
    });

    // This executes each seconds the playtime updates || To the extent that it breaks bounds in componentDidUpdate, even if the state does not fullfill the conditions for update
    this.props.audio.addEventListener('timeupdate', function() {
      if (this.duration) {
        thisComponent.updateTimeProgessBar(this);
      }
    });
    this.updateTimeProgessBar = audio => {
      const currentTime = this.refs.currentTime;
      const timeRemaining = this.refs.timeRemaining;
      const progressBar = this.refs.progressBar;

      const currentTimeValue = this.audioInstance.current.formatTime(audio.currentTime);
      const timeRemainingValue = this.audioInstance.current.formatTime(audio.duration - audio.currentTime);
      const progressBarValue = audio.currentTime / audio.duration * 100;

      currentTime.innerHTML = currentTimeValue
      timeRemaining.innerHTML = timeRemainingValue;
      progressBar.style.width = progressBarValue + '%';
    }
  }

  // Prevent default behaviour of mousedown, mousemove, etc in music-player div
  preventBehaviour = event => {
    event.preventDefault();
  }

  playSong = () => {
    this.audioInstance.current.play();
  }
  pauseSong = () => {
    this.audioInstance.current.pause();
  }


  prevSong = () => {
    this.audioInstance.current.playPreviousSong();
  }
  nextSong = () => {
    this.audioInstance.current.playNextSong();
  }


  timeFromOffset = (mouse, progressBar) => {
    const percentage = mouse.offsetX / progressBar.clientWidth * 100;
    // let percentage = mouse.offsetX / parseFloat(getComputedStyle(progressBar, null).width.replace("px", "")) * 100; //also works perfectly

    const seconds = this.props.audio.duration * (percentage  / 100);
    this.audioInstance.current.setTime(seconds);
  }

  setRepeat = () => {
    this.props.onRepeatPressed();
  }
  setShuffle = () => {
    this.props.onShufflePressed();
  }
  setMute = () => {
    this.props.onMutePressed();
    this.audioInstance.current.setMute();
  }

  openSongsFromLeft = () => {
    this.props.onOpenSongsClicked();
  }

  render() {
    return(
      <div className="lower-div">
        {/* <Audio ref="audio" /> */}
        <Audio ref={this.audioInstance} />
          
        <div className="music-player" ref="musicPlayer">
          <div className="left" onClick={this.openSongsFromLeft}>
            <section className="album-art">
              {this.props.currentlyPlaying.artwork_path ? <img src={process.env.REACT_APP_SERVER_ARTWORK_URL + this.props.currentlyPlaying.artwork_path} alt="img" /> : 'loading...1'}
            </section>
            <section className="track-details">
              {this.props.currentlyPlaying.title ? <span className="title">{this.props.currentlyPlaying.title}</span> : 'loading...'}
              {this.props.currentlyPlaying.artistName ? <span className="artist">{this.props.currentlyPlaying.artistName}</span> : 'loading...3'}
            </section>
          </div>

          <div className="middle">
            <section className="controls">
              <div>
                <ControlButtons class="control-button shuffle" title="Shuffle Button"
                  src={this.props.shuffle ? shuffleActive : shuffleInactive}  alt="shuffle"
                    clicked={this.setShuffle} />

                <ControlButtons class="control-button previous" title="Previous Button"
                  src={previous}  alt="previous" clicked={this.prevSong} />

                { !this.props.playing ? <ControlButtons class="control-button play" title="Play Button"
                  src={play}  alt="play" clicked={this.playSong} />
                :
                <ControlButtons class="control-button pause" title="Pause Button"
                  src={pause}  alt="pause" clicked={this.pauseSong} />
                }
                <ControlButtons class="control-button next" title="Next Button"
                  src={next}  alt="next" clicked={this.nextSong} />

                <ControlButtons class="control-button repeat" title="Repeat Button"
                  src={this.props.repeat ? repeatActive : repeatInactive}  alt="repeat" 
                    clicked={this.setRepeat} />
              </div>
            </section>
            <section className="progress">
              <span className="current-time" ref="currentTime">0.00</span>
              <div className="progress-bar-container" ref="progressBarContainer">
                <div className="progress-bar" ref="progressBar"></div>
              </div>
              <span className="remaining-time" ref="timeRemaining">0.00</span>
            </section>
          </div>
          <div className="right">
            <section>
              <button title="Mute Button" onClick={this.setMute}>
                <img src={this.props.mute ? volumeInactive : volumeActive} alt="vol" />
              </button>
              <div className="volume-bar-container" ref="volumeBarCotainer">
                <div className="volume-bar" ref="volumeBar"></div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    audio: state.musPlay.audio,
    songs: state.songs.songs,
    playing: state.musPlay.playing,
    shuffle: state.musPlay.shuffle,
    repeat: state.musPlay.repeat,
    mute: state.musPlay.mute,
    openSongsClickedValue: state.musPlay.openSongsClickedValue,
    currentlyPlaying: state.musPlay.currentlyPlaying
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShufflePressed: () => dispatch(actions.shufflePressed()),
    onRepeatPressed: () => dispatch(actions.repeatPressed()),
    onMutePressed: () => dispatch(actions.mutePressed()),
    onSetInitialPlaylistToAllSongs: () => dispatch(actions.setInitialPlaylistToAllSongs()),
    onOpenSongsClicked: () => dispatch(actions.openSongsClicked())
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(LowerSection);