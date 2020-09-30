import React, { Component } from 'react';
import './Search.scss';
import { withRouter } from 'react-router-dom';

import ResultSection from './ResultSection/ResultSection';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: '',
      nothing: true,
      content: ''
    }
  }

  componentDidMount() {
    const thisComponent = this;

    const searchInput = this.refs.searchInput;
    searchInput.focus();

    searchInput.addEventListener('keyup', function(event) {
      window.$timer = setTimeout(function() {
        let searchValue = searchInput.value;
        
        const path = thisComponent.props.history.location;

        let newPath = path.pathname + path.search;
        newPath = newPath + '&term=' + searchValue;
        
        console.log(newPath)
        // thisComponent.props.history.push();
      }, 1000);
    });
  }
    

  getSearchTerm = event => {

    this.setState({ term: event.target.value });

    if(event.target.value === 'Joshua') {
      this.setState({ nothing: false, content: event.target.value });
    }
    else {
      this.setState({ nothing: true, content: '' });
    }
  }

  render() {
    return (
      <div className="search">
        <section className="search-box">
          <span>Search for a Song, Artist or Album.</span>
          <input type="search" placeholder="Start Typing..." value={this.state.term} 
            onChange={this.getSearchTerm} ref="searchInput" />
        </section>
          {this.state.term !== '' &&
            <section className="search-results">
              <ResultSection content={this.state.content} name="songs" query={this.state.term} nothing={this.state.nothing} />
              <ResultSection content={this.state.content} name="artists" query={this.state.term} nothing={this.state.nothing} />
              <ResultSection content={this.state.content} name="albums" query={this.state.term} nothing={this.state.nothing} />
            </section>}
      </div>
    );
  }
};

export default withRouter(Search);
