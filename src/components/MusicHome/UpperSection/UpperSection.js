import React from 'react';
import './UpperSection.scss';

import Navigation from './Navigation/Navigation';
import Albums from './Albums/Albums';
import Search from './Search/Search';
import Settings from './Settings/Settings';
import UpdateDetails from './UpdateDetails/UpdateDetails';
import Playlists from './Playlists/Playlists';
import Songs from './Songs/Songs';

const UpperSection = props => (
  <div className="upper-div">
    <Navigation name={props.name} />
    <section className="content-section">
      {props.urlParam === '?albums' && <Albums />}
      {props.urlParam === '?search' && <Search />}
      {props.urlParam === '?browse' && <Albums />}
      {props.urlParam === '?playlists' && <Playlists />}
      {props.urlParam === '?settings' && <Settings name={props.name} />}
      {props.urlParam === '?update-details' && <UpdateDetails />}
      {new RegExp(/^\?songs&alid=\d+&arid=\d+$/).test(props.urlParam) && <Songs />}
    </section>
  </div>
);

export default UpperSection;
