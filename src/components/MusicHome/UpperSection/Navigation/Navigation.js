import React from 'react';
import { NavLink } from 'react-router-dom';

import HomeIcon from '../../../../assets/icons/home.png';
import SearchIcon from '../../../../assets/icons/search.png';

const Navigation = props => (
  <section className="nav-section">
    <div className="navigation">
      <NavLink to='/music-home?albums'><img src={HomeIcon} alt="" /></NavLink>
      <NavLink to='/music-home?search' className="search">Search <img src={SearchIcon} alt="" /></NavLink>
      <NavLink to='/music-home?browse'>Browse</NavLink>
      <NavLink to='/music-home?playlists'>Playlist</NavLink>
      {/* Investigate into why loading doesnt show, but undefined rather || Problem Solved */}
      {
        props.name.firstname && props.name.lastname ? 
        <NavLink to='/music-home?settings'>{props.name.firstname + ' ' + props.name.lastname}</NavLink> : 
        <NavLink to='#'>Loading...</NavLink>
      }
    </div>
  </section>
);

export default Navigation;
