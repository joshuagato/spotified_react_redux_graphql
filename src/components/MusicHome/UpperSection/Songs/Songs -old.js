import React, { Component } from 'react';
import './Songs.scss';
import Song from './Song/Song';

import axios from 'axios';

export class Songs extends Component {

    state = {
      songs: [],
      albumTitle: '',
      artistName: '',
      artwork: '',
      numofsongs: ''
    }

    UNSAFE_componentWillMount() {
      const albumId = new URLSearchParams(window.location.search).get('alid');
      const artistId = new URLSearchParams(window.location.search).get('arid');

      axios.get('http://localhost:8000/api/songs/' + albumId).then(response => {
          this.setState({ songs: response.data });
      }).catch(error => console.log(error));


      // this comes as an array of just one item: That is the reason for the map method
      axios.get('http://localhost:8000/api/albums/' + albumId).then(response => {
        response.data.map(detail => {
          this.setState({ artwork: detail.artwork_path, albumTitle: detail.title, artistId: detail.artist });
          return detail;
        });
      }).catch(error => console.log(error));
        


    // =====================================================================================================

      axios.get('http://localhost:8000/api/numofsongs/' + albumId).then(response => {
        // console.log(response.data);
        this.setState({ numofsongs: response.data });
        
        // the eloquent way
        // response.data.map(response => this.setState({ numofsongs: response.count }));
      }).catch(error => console.log(error));

    // =====================================================================================================

      axios.get('http://localhost:8000/api/artist/' + artistId).then(response => {
        response.data.map(response => this.setState({ artistName: response.name }));
      }).catch(error => console.log(error));
    }

    songs = (num) => {
      if(num === 0 || num >= 2) {
        return "Songs";
      }
      else if(num === 1) {
        return "Song";
      }
    }

  render() {
    return (
      <div className="songs-container">
        <section className="song-details-section">
          <div className="albumArt-section">
            {this.state.artwork !== '' ? <img src={require( "../../../../assets/artwork/" + this.state.artwork )} alt="" /> : ''}
          </div>
          <div className="details-section">
            <h1>{this.state.albumTitle}</h1>
            <p>By {this.state.artistName}</p>
            <p>{this.state.numofsongs} {this.songs(this.state.numofsongs)}</p>
          </div>
        </section>

        <section className="songs-section">
          {
            this.state.songs.map((song, index) => {
              return(
                <Song key={song.id} number={index+1} title={song.title} artist={this.state.artistName} duration={song.duration} />
              )
            })
          }
        </section>
      </div>
    );
  }
}

export default Songs;
