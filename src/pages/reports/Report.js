import * as React from 'react';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import { Button, Container } from '@material-ui/core';

const { useState, useEffect } = React;

const Report = (props) => {
  const { id } = props.match.params;
  const {grupos, grupoHorarios} = props.grupoReducer;
  const {materias} = props.materiasReducer;
  const {carreras} = props.carrerasReducer;
  const [report,setReport] = useState(null);  
  const [addRep,setAddRep] = useState([]);

  useEffect(() => {
    BackendConnection.getReportByID(id)
      .then((resp)=>{
        setReport(resp[0]);                    
        
        BackendConnection.getAllAdditionalReport()
          .then((add)=>{
            const a=add.filter((ad)=>resp[0].idassistance==ad.assistance_idassistance)
            setAddRep(a);
          })        
      })
  }, []);

  const obtMateria=()=>{
    const g=grupoHorarios.find((g)=>report.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    return mat.namemateria;
  };
  return (
    <div>
      <h1>ID del Reporte: {id}</h1>
      {report && <h2>Materia: {obtMateria()}</h2>}
      {report && <h2>Plataforma: {report.platform}</h2>}
      {report && <h2>Contenido de la Clase: {report.classcontain}</h2>}   
      {report && <h2>Observaciones de la clase: {report.observations}</h2>}  

      {addRep.length>0&&(addRep[0].archivo!==""?
      <Container align="center">
          <iframe
            title="iframe"
            data="application/pdf"
            src={addRep[0].archivo}
            style={{ height: '550px', width: '700px' }}
          />
        </Container>:
        <h2>El usuario no adjunto una falta</h2>
        )
      }
    </div>
    );
  }


const mapStateToProps=(state)=>{
  return{
    users:state.usersReducer,
    grupoReducer:state.grupoReducer,
    materiasReducer:state.materiasReducer,
    carrerasReducer:state.careersReducer,
  };
};

export default connect(mapStateToProps)(withRouter(Report));
