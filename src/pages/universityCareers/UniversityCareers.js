import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
// import ContainerFilter from '../../components/filters/ContainerFilter';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import { changeCarrera, filterCareer } from '../../redux/actions/index.actions';
import { routes } from '../../router/RoutesConstants';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import BackendConnection from '../../api/BackendConnection';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

function UniversityCareers(props) {
  const { careers, careersAux, loading } = props.careersReducer;
  const { facultadSeleccionada } = props.filtersReducer;
  const [facultadAux, setFacultadAux] = useState(0);
  const [careersSelected, setCareersSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

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
  };

  const confirmDelete = (carrera) => {
    setOpenDialog(true);
    setCareersSelected(carrera);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setCareersSelected(null);
  };

  const renderCareers = () => {
    return (
      <div>
        {careersAux.map((career) => {
          return (
            <div key={career.idcarrera}>
              <CardItem
                text={career.namecarrera}
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

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
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
      {careers.length > 0 ? renderCareers() : <div />}
      {loading && <h3>Cargando...</h3>}
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newCarrera}>
        {fab.icon}
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => ({
  careersReducer: state.careersReducer,
  filtersReducer: state.filtersReducer,
});

const mapDipatchToProps = (dispatch) => ({
  getCareers: () => dispatch(getCarreras()),
  filterCareer: (careers) => dispatch(filterCareer(careers)),
  changeCarrera: (carrera) => dispatch(changeCarrera(carrera)),
});

export default connect(mapStateToProps, mapDipatchToProps)(withRouter(UniversityCareers));
