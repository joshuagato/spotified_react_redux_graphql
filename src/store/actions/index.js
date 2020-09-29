export { auth, authCheckState, logout } from './auth';

export { registerUser } from './register';

export { updateDetails, updatePassword } from './update-details';

export { fetchUserForMusicHome, fetchUserForUpdateDetails } from './fetch-user-details';

export 
  { trackPlaying, trackPaused, repeatPressed, shufflePressed, setCurentlyPlaying, 
    mutePressed, openSongsClicked, songsPageLoaded } from './music-player';

export { fetchAllSongDetails, setInitialPlaylistToAllSongs } from './songs';