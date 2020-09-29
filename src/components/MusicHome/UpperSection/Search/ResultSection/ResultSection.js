import React from 'react';

const ResultSection = props => (
  <section className="result-section">
    <h1 className="heading">{props.name}</h1>
    
    {props.nothing ? <div className="nothing-found">No {props.name} found matching {props.query}</div> :
    <div className="something-found">{props.content}</div>}
  </section>
);

export default ResultSection;
