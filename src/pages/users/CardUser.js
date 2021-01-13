import React, { useEffect, useState } from 'react';
import CardItem from '../../components/CardItem';
import BackendConnection from '../../api/BackendConnection';

function CardUser(props) {
  const { user, confirmDelete, updateUser } = props;
  const [typeUser, setTypeUser] = useState('');


  useEffect(() => getRol(user.idusers), [])

  const getRol = (idUser) => {
    BackendConnection.getUserRolByIdUser(idUser).then((response) => {
      if (response.length > 0) {
        setTypeUser(response[0].rolename)
      }
    });
  };

  return (
    <div key={user.idusers}>
      <CardItem
        text={`${user.firstname} ${user.lastname}`}
        secondaryText={user.email}
        tercerText={typeUser}
        showEditIcon={true}
        showDeleteIcon={true}
        deleteClick={() => confirmDelete(user)}
        editClick={() => updateUser(user)}
      />
      <div style={{ height: 20 }}/>
    </div>
  );
}

export default CardUser;
