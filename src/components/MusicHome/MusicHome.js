import React, { Component } from 'react';
import './MusicHome.scss';
import { connect } from 'react-redux';
// import axios from 'axios';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import LowerSection from './LowerSection/LowerSection';
import UpperSection from './UpperSection/UpperSection';
import * as actions from '../../store/actions/index';
import Audio from './Audio/Audio';

class MusicHome extends Component {

  constructor(props) {
    super(props);
    this.audioInstance = React.createRef();
  }

    componentDidMount() {
      if (this.props.location.search === '') this.props.history.push('/music-home?browse');
        
      // Fetching the logged in user's details
      this.props.onFetchUser(this.props.userId);

      // I NEEED TO FIX A BUG HERE, THESE PROPERTIES MUST BE SET ON THE UPPERSECTION or LINKS RATHER
      // Prevent the links from getting highlighted when dragged
      const musicHomeContainer = this.refs.musicHome;
      musicHomeContainer.addEventListener('mousemove', this.preventBehaviour);
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.userData.firstname !== this.props.userData.firstname || 
        prevProps.userData.lastname !== this.props.userData.lastname) {
        this.props.onFetchUser(this.props.userId);
      }
    }

    // Prevent default behaviour of mousedown, mousemove, etc in music-player div
    preventBehaviour = event => {
      event.preventDefault();
    }

    render() {
      // I NEEED TO FIX A BUG HERE || I'VE FIXED IT
      let param = this.props.location.search;

      return (
        <div className="music-home" ref="musicHome">
          <Audio ref={this.audioInstance} />

          <div className="fixed-bar">
            <section className="mobile-nav">
              <NavLink to='/music-home?albums'><FontAwesomeIcon icon={faHome} /></NavLink>
              <NavLink to='/music-home?search'><FontAwesomeIcon icon={faSearch} /></NavLink>
              <NavLink to='/music-home?browse'><FontAwesomeIcon icon={faPlay} /></NavLink>
              <NavLink to='/music-home?playlists'><FontAwesomeIcon icon={faListAlt} /></NavLink>
              <NavLink to='/music-home?settings'><FontAwesomeIcon icon={faUserAlt} /></NavLink>
            </section>
          </div>

          {/* Upper Section */}
          <UpperSection urlParam={param} name={this.props.userData} />

          {/* Lower Section */}
          <LowerSection />
        </div>
      );
    }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    userData: state.userDet.userDataForAll,
    // userData: state.userDet.userDataForHome,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUser: userId => dispatch(actions.fetchUserForMusicHome(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(MusicHome);
