import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';

const Absence = (props) => {
  const { id } = props.match.params;
  const [absenceData, setAbsenceData] = useState(null); 
  const [user,setUser]=useState([]);
  useEffect(() => {      
    BackendConnection.getAbsenceById(id).then(async(res) => {
    setAbsenceData(res);    
    await BackendConnection.getUserById(res[0].users_idusers)
      .then((res)=>{
      setUser(res)
    })
    });      
  }, []);
  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <div>
        <h1>ID del Reporte: {id}</h1>
        {user.length>0&&<h2>Usuario: {user[0].firstname} {user[0].lastname}</h2>}
        {user.length>0&&<h2>Correo: {user[0].email}</h2>}
      {absenceData && (
        <Container align="center">
          <h2>En fecha: {getDate(absenceData[0].fecha)}</h2>
          <iframe
            title="iframe"
            data="application/pdf"
            src={absenceData[0].archivo}
            style={{ height: '550px', width: '700px' }}
          />
        </Container>
      )}
    </div>
  );
};

export default (withRouter(Absence));
