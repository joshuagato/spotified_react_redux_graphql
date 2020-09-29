import * as actionTypes from '../actions/actionTypes';

const initialState = {
  audio: document.createElement('audio'),
  openSongsClickedValue: false,
  playing: false,
  shuffle: false,
  repeat: false,
  mute: false,
  currentlyPlaying: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.TRACK_PLAYING_OR_PLAY_BUTTON_PRESSED:
      return { ...state, playing: true };

    case actionTypes.TRACK_PAUSED_OR_PAUSE_BUTTON_PRESSED:
      return { ...state, playing: false };

    case actionTypes.REPEAT_BUTTON_PRESSED:
      return { ...state, repeat: !state.repeat };

    case actionTypes.SHUFFLE_BUTTON_PRESSED:
      return { ...state, shuffle: !state.shuffle };

    case actionTypes.MUTE_BUTTON_PRESSED:
      return { ...state, mute: !state.mute };

    case actionTypes.SET_CURRENTLY_PLAYING:
      return { ...state, currentlyPlaying: action.currentTrack };

    case actionTypes.OPEN_SONGS_CLICKED:
      return { ...state, openSongsClickedValue: true };

    case actionTypes.SONGS_PAGE_LOADED:
      return { ...state, openSongsClickedValue: false };

    case actionTypes.GET_AND_PUSH_ARTWORK_PATH:
      return { 
        ...state,
        currentlyPlaying: { ...state.currentlyPlaying, artwork_path: action.artwork_path }
      }

    case actionTypes.GET_AND_PUSH_ARTIST_NAME:
      return {  ...state, 
        currentlyPlaying: { ...state.currentlyPlaying, artistName: action.artistName }
      }

    default: return state;
  }
}

export default reducer;