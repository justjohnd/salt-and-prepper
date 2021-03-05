import React from 'react';
import InfoCon from './InfoCon';
import styled from 'styled-components';
import Button from './Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const UserColor = styled.div`
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
          <UserColor bg={props.color} />
          <h2 className="name">{props.name}</h2>
          <Button
            className="btn-round btn-sm"
            onClick={() => {}}
            buttonText={<EditIcon />}
          />
          <Button
            className="btn-round btn-sm"
            onClick={() => {}}
            buttonText={<DeleteIcon />}
          />
        </div>
        <div className="bottom">
          <InfoCon title="Age" info={props.age} />
          <InfoCon title="Gender" info={props.gender} />
          <InfoCon title="Daily Calories" info={props.calories} />
        </div>
      </div>
    </section>
  );
}

export default Card;
