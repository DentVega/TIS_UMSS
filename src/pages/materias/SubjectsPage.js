import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMateriasBackend, getSchools, getCarreras } from '../../redux/actions/indexthunk.actions';
import { changeMateria } from '../../redux/actions/index.actions';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import CardItem from '../../components/CardItem';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import FloatingButton from '../../components/FloatingButton';

function SubjectPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);

  const { materias, loading } = props.materiasReducer;
  const {schools} = props.schoolReducer;
  const {careers} = props.careersReducer;
  const [materiaSelecionada, setMateriaSelecionada] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = props.userReducer;

  useEffect(() => {
    if (loading) {
      props.getMateriasBackend();
    }
    props.getSchools();
    props.getCareers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newMateria = () => {
    props.changeMateria(null);
    props.history.push(routes.registerMateria);
  };

  const updateMateria = (materia) => {
    props.changeMateria(materia);
    props.history.push(`${routes.subjects}/${materia.idmateria}`);
  };

  const deleteMateria = () => {
    BackendConnection.deleteMateria(materiaSelecionada.idmateria).then(() => {
      props.getMateriasBackend();
      setOpenDialog(false);
    });
    let aux = new Date();
    let val = "idmateria:" + materiaSelecionada.idmateria + ",carrera_idcarrera:" + materiaSelecionada.carrera_idcarrera + ",namemateria:" + materiaSelecionada.carrera_idcarrera;
    BackendConnection.createUserslog(1, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0)
  };

  const confirmDelete = (materia) => {
    setOpenDialog(true);
    setMateriaSelecionada(materia);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setMateriaSelecionada(null);
  };

  const getCarrera=(mat)=>{
    const career=careers.find((care)=>care.idcarrera==mat.carrera_idcarrera)
    return career.namecarrera;
  };
  const getFacultad=(mat)=>{
    const career=careers.find((care)=>care.idcarrera==mat.carrera_idcarrera);
    const facul=schools.find((school)=>school.idfacultad==career.facultad_idfacultad);
    return facul.namefacultad;
  };

  const renderMaterias = () => {
    return (
      <div>
        {
          materias.length > 0 && (schools.length > 0 && (careers.length>0 && materias.map((materia) => {
            return (
              <div key={materia.idmateria}>
                <CardItem
                  text={`Nombre: ${materia.namemateria}`}
                  secondaryText={`Carrera: ${getCarrera(materia)}`}
                  tercerText = {`Facultad: ${getFacultad(materia)}`}
                  showEditIcon={true}
                  showDeleteIcon={true}
                  editClick={() => updateMateria(materia)}
                  deleteClick={() => confirmDelete(materia)}
                />
                <div style={{ height: 20 }} />
              </div>
            );
          })))
        }
      </div>
    );
  };

  return (
    <div>
      <CustomAlertDialog
        title={sConfirm}
        messageText={'Seguro que desea eliminar esta Materia'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteMateria}
      />

      <h1>Materias</h1>
      {materias.length > 0 ? renderMaterias() : <div />}
      {loading && <h3>Cargando...</h3>}
      <FloatingButton onClick={newMateria}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    materiasReducer: state.materiasReducer,
    schoolReducer: state.schoolReducer,
    careersReducer: state.careersReducer,

  };
};

const mapDispathToProps = (dispatch) => ({
  changeMateria: (materia) => dispatch(changeMateria(materia)),
  getMateriasBackend: () => dispatch(getMateriasBackend()),
  getSchools:() => dispatch(getSchools()),
  getCareers: () => dispatch(getCarreras()),
  
});

export default connect(mapStateToProps, mapDispathToProps)(withRouter(SubjectPage));
