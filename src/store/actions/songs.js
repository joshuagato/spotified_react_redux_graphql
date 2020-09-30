import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setInitialPlaylistToAllSongs = () => {
  return dispatch => {
    // Query for all songs
    const allSongsQuery = {
      query: `
        {
          allSongs {
            id title artist album path
          }
        }
      `
    };
    axios.post('/graphql', allSongsQuery).then(response => {
      const allSongs = response.data.data.allSongs;
      dispatch(setInitialPlaylist(allSongs));
    })
    .catch(error => console.log(error));
  }
}

const setInitialPlaylist = songs => {
  return {
    type: actionTypes.SET_INITIAL_PLAYLIST,
    songsArray: songs
  }
}

export const fetchAllSongDetails = (albumId, artistId) => {
  return dispatch => {
    dispatch(albumSongsQuery(albumId));
    dispatch(albumQuery(albumId));
    dispatch(numOfSongsQuery(albumId));
    dispatch(artistQuery(artistId));
  }
}

const artistQuery = artistId => {
  return dispatch => {
    const artistQuery = {
      query: `
        query FetchArtist($id: Int!) {
          artist(artistId: $id) {
            id name
          }
        }
      `,
      variables: { id: +artistId }
    };
    axios.post('/graphql', artistQuery).then(response => {
      const result = response.data.data.artist;
      dispatch(artistQuerySuccess(result.name));
    })
    .catch(error => console.log(error));
  }
}

const artistQuerySuccess = name => {
  return {
    type: actionTypes.ARTIST_QUERY_SUCCESS,
    artistName: name
  }
}

const numOfSongsQuery = albumId => {
  return dispatch => {
    const numOfSongsQuery = {
      query: `
        query NumOfSongs($id: Int!) {
          numOfSongs(albumId: $id)
        }
      `,
      variables: { id: +albumId }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, numOfSongsQuery).then(response => {
      const numofsongs = response.data.data.numOfSongs
      dispatch(numOfSongsQuerySuccess(numofsongs));
    })
    .catch(error => console.log(error));
  }
}

const numOfSongsQuerySuccess = songsTotal => {
  return {
    type: actionTypes.NUM_OF_SONGS_QUERY_SUCCESS,
    numofsongs: songsTotal
  }
}

const albumQuery = albumId => {
  return dispatch => {
    const albumQuery = {
      query: `
        query FetchAlbum($id: Int!) {
          album(albumId: $id) {
            title artwork_path
          }
        }
      `,
      variables: { id: +albumId }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, albumQuery).then(response => {
      const result = response.data.data.album;
      dispatch(albumQuerySuccess(result.title, result.artwork_path));
    })
    .catch(error => console.log(error));
  }
}

const albumQuerySuccess = (title, artwork) => {
  return {
    type: actionTypes.ALBUM_QUERY_SUCCESS,
    albumTitle: title,
    albumArtwork: artwork
  }
}

const albumSongsQuery = albumId => {
  return dispatch => {
    const albumSongsQuery = {
      query: `
        query FetchAlbumSong($id: Int!) {
          albumSongs(albumId: $id) {
            id title artist album path duration
          }
        }
      `,
      variables: { id: +albumId }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, albumSongsQuery).then(response => {
      const result = response.data.data.albumSongs;
      dispatch(albumSongsQuerySuccess(result));
    })
    .catch(error => console.log(error));
  }
}

const albumSongsQuerySuccess = songs => {
  return {
    type: actionTypes.ALBUM_SONGS_QUERY_SUCCESS,
    songsArray: songs
  }
}