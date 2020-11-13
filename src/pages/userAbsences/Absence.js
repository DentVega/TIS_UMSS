import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';

const Absence = (props) => {
  const { id } = props.match.params;
  const [absenceData, setAbsenceData] = useState(null);

  useEffect(() => {      
    BackendConnection.getAbsenceById(id).then((res) => {
    setAbsenceData(res);
    });      
  }, []);
  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  return (
    <div>
        <h1>ID del Reporte: {id}</h1>
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

export default withRouter(Absence);
