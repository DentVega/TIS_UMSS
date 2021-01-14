import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras, getSchools } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
// import ContainerFilter from '../../components/filters/ContainerFilter';
import { changeCarrera, filterCareer } from '../../redux/actions/index.actions';
import { routes } from '../../router/RoutesConstants';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import BackendConnection from '../../api/BackendConnection';
import FloatingButton from '../../components/FloatingButton';

function UniversityCareers(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const { careers, careersAux, loading } = props.careersReducer;
  const {schools} = props.schoolReducer;
  const { facultadSeleccionada } = props.filtersReducer;
  const [facultadAux, setFacultadAux] = useState(0);
  const [careersSelected, setCareersSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = props.userReducer;

  if (facultadSeleccionada !== facultadAux) {
    if (facultadSeleccionada === 0) {
      props.filterCareer(careers);
      setFacultadAux(facultadSeleccionada);
    } else {
      const cAux = careers.filter((career) => career.facultad_idfacultad === facultadSeleccionada);
      props.filterCareer(cAux);
      setFacultadAux(facultadSeleccionada);
    }
  }

  useEffect(() => {
    if (loading) {
      props.getCareers();
      props.getSchools();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newCarrera = () => {
    props.changeCarrera(null);
    props.history.push(routes.registerCareer);
  };

  const updateCarrera = (carrera) => {
    props.changeCarrera(carrera);
    props.history.push(`${routes.career}/${carrera.idcarrera}`);
  };

  const deleteCarrera = () => {
    BackendConnection.deleteCareer(careersSelected.idcarrera).then(() => {
      props.getCareers();
      setOpenDialog(false);
    });
    let aux = new Date();
    let val = "idcarrera:" + careersSelected.idcarrera + ",facultad_idfacultad:" + careersSelected.facultad_idfacultad + ",namecarrera:" + careersSelected.namecarrera;
    BackendConnection.createUserslog(1, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
      console.log("ok deleted");
    });
  };

  const confirmDelete = (carrera) => {
    setOpenDialog(true);
    setCareersSelected(carrera);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setCareersSelected(null);
  };

  const schoolName=(career)=>{
    const scho=schools.find((school)=>career.facultad_idfacultad==school.idfacultad)
    return scho.namefacultad;
  };

  const renderCareers = () => {
    return (
      <div>
        {careersAux.map((career) => {
          return (
            <div key={career.idcarrera}>
              <CardItem
                text={`Nombre: ${career.namecarrera}`}
                secondaryText={`Facultad: ${schoolName(career)}`}
                tercerText={career.descripcion}
                showEditIcon={true}
                showDeleteIcon={true}
                editClick={() => updateCarrera(career)}
                deleteClick={() => confirmDelete(career)}
              />
              <div style={{ height: 20 }} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <CustomAlertDialog
        title={sConfirm}
        messageText={'Seguro que desea eliminar esta Carrera'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteCarrera}
      />

      <h1>Carreras</h1>
      {/*<ContainerFilter showFFacultad={true} />*/}
      {careers.length > 0 && schools.length > 0 ? renderCareers() : <div />}
      {loading && <h3>Cargando...</h3>}
      <FloatingButton onClick={newCarrera}/>
    </div>
  );
}

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  careersReducer: state.careersReducer,
  filtersReducer: state.filtersReducer,
  schoolReducer: state.schoolReducer,
});

const mapDipatchToProps = (dispatch) => ({
  getCareers: () => dispatch(getCarreras()),
  filterCareer: (careers) => dispatch(filterCareer(careers)),
  changeCarrera: (carrera) => dispatch(changeCarrera(carrera)),
  getSchools:() => dispatch(getSchools()),

});

export default connect(mapStateToProps, mapDipatchToProps)(withRouter(UniversityCareers));
