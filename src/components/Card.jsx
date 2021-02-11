import React from 'react';
import InfoCon from './InfoCon';

function Card(props) {
  return (
    <div>
      <div className="card">
        <div className="top">
          <div className="circle"></div>
          <h2 className="name">{props.name}</h2>
        </div>
        <div className="bottom">
          <InfoCon title="Age" info={props.age} />
          <InfoCon title="Gender" info={props.gender} />
          <InfoCon title="Daily Calories" info={props.calTarget} />
        </div>
      </div>
    </div>
  );
}

export default Card;
