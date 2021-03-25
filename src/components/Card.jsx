import React from 'react';
import InfoCon from './InfoCon';
import styled from 'styled-components';
import Button from './Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const UserColor = styled.div`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background-color: ${props => (props.bg != '' ? props.bg : 'black')};
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
            onClick={() => {
              !props.formEditVisibility && props.changeFormEditVisibility();
              props.formVisibility && props.changeFormVisibility();
              props.onEdit(props.user);
            }}
            buttonText={<EditIcon />}
          />
          <Button
            className="btn-round btn-sm"
            onClick={() => {
              props.onDelete(props.id);
            }}
            buttonText={<DeleteIcon />}
          />
        </div>
        <div className="bottom">
          <InfoCon title="Age" info={props.age} />
          <InfoCon title="Gender" info={props.gender} />
          <InfoCon
            title="Daily Calories"
            info={
              props.calories === 0 ? (
                <Tooltip title="Sorry! We don't calculate calories for children under four years old">
                  <IconButton aria-label="Sorry! We don't calculate calories for children under four years old">
                    <AnnouncementIcon className="btn-small tooltip" />
                  </IconButton>
                </Tooltip>
              ) : (
                props.calories
              )
            }
          />
        </div>
      </div>
    </section>
  );
}

export default Card;
