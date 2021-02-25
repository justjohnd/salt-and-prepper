import React from 'react';
import InfoCon from './InfoCon';
import styled from 'styled-components';

const FamilyMemberColor = styled.div`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-color: ${(props) => (props.bg != '' ? props.bg : `black`)};
`;

function Card(props) {
  return (
    <section className="con-card">
      <div className="card">
        <div className="top">
          <FamilyMemberColor bg={props.color} />
          <h2 className="name">{props.name}</h2>
        </div>
        <div className="bottom">
          <InfoCon title="Age" info={props.age} />
          <InfoCon title="Gender" info={props.gender} />
          <InfoCon title="Daily Calories" info={props.calTarget} />
        </div>
      </div>
    </section>
  );
}

export default Card;
