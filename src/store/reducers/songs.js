import * as actionTypes from '../actions/actionTypes';

const initialState = {
  songs: [],
  albumTitle: '',
  albumArtwork: '',
  numofsongs: '',
  artistName: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ALBUM_SONGS_QUERY_SUCCESS:
      return { ...state, songs: action.songsArray };

    case actionTypes.ALBUM_QUERY_SUCCESS:
      return { ...state, albumTitle: action.albumTitle, albumArtwork: action.albumArtwork };

    case actionTypes.NUM_OF_SONGS_QUERY_SUCCESS:
      return { ...state, numofsongs: action.numofsongs };

    case actionTypes.ARTIST_QUERY_SUCCESS:
      return { ...state, artistName: action.artistName };

    case actionTypes.SET_INITIAL_PLAYLIST:
      return { ...state, songs: action.songsArray };

    default: return state;
  }
}

export default reducer;