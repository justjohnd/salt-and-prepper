import React from 'react';

function InfoCon(props) {
  return (
    <div>
      <div className="info-con">
        <h3 className="info-title">{props.title}</h3>
        <p className="info">{props.info}</p>
      </div>
    </div>
  );
}

export default InfoCon;
