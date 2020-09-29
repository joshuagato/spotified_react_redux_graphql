import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setCurentlyPlaying = track => {
  return dispatch => {
    dispatch(getCurrentTrackDetails(track));

    // Album query
    const albumQuery = {
      query: `
        query FetchAlbum($id: Int!) {
          album(albumId: $id) {
            artwork_path
          }
        }
      `,
      variables: { id: +track.album }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, albumQuery).then(response => {
      const result = response.data.data.album;
      dispatch(getAndPushArtworkPath(result.artwork_path));
    })
    .catch(error => console.log(error));

    // Artist query
    const artistQuery = {
      query: `
        query FetchArtist($id: Int!) {
          artist(artistId: $id) {
            id name
          }
        }
      `,
      variables: { id: +track.artist }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, artistQuery).then(response => {
      const result = response.data.data.artist;
      dispatch(getAndPushArtistName(result.name));
    })
    .catch(error => console.log(error));
  }
}

const getAndPushArtistName = name => {
  return {
    type: actionTypes.GET_AND_PUSH_ARTIST_NAME,
    artistName: name
  }
}

const getAndPushArtworkPath = artwork => {
  return {
    type: actionTypes.GET_AND_PUSH_ARTWORK_PATH,
    artwork_path: artwork
  }
}

const getCurrentTrackDetails = track => {
  return {
    type: actionTypes.SET_CURRENTLY_PLAYING,
    currentTrack: track
  }
}

export const trackPlaying = () => {
  return {
    type: actionTypes.TRACK_PLAYING_OR_PLAY_BUTTON_PRESSED
  };
}
export const trackPaused = () => {
  return {
    type: actionTypes.TRACK_PAUSED_OR_PAUSE_BUTTON_PRESSED
  };
}

export const repeatPressed = () => {
  return {
    type: actionTypes.REPEAT_BUTTON_PRESSED
  };
}
export const shufflePressed = () => {
  return {
    type: actionTypes.SHUFFLE_BUTTON_PRESSED
  };
}
export const mutePressed = () => {
  return {
    type: actionTypes.MUTE_BUTTON_PRESSED
  };
}

export const openSongsClicked = () => {
  return {
    type: actionTypes.OPEN_SONGS_CLICKED
  }
};

export const songsPageLoaded = () => {
  return {
    type: actionTypes.SONGS_PAGE_LOADED
  }
};