import * as React from 'react';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';

const { useState, useEffect } = React;

const Report = (props) => {
  const { id } = props.match.params;
  const [report,setReport] = useState(null);
  const [additionalClass,setAdditionalclass] = useState(null);

  useEffect(() => {
    BackendConnection.getReportByID(id)
      .then((resp)=>{
        setReport(resp[0]);
        BackendConnection.getAdditionalClassByGrpHorID(resp[0].grupohorarios_idgrupohorarios)
          .then((res)=>{
            setAdditionalclass(res[0]);
          })
      })
  }, []);

  return (
    <div>
      <h1>ID del Reporte:{id}</h1>
    </div>
  );
};

export default withRouter(Report);
