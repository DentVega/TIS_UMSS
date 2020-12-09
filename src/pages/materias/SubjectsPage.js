import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMateriasBackend } from '../../redux/actions/indexthunk.actions';
import { changeMateria } from '../../redux/actions/index.actions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import CardItem from '../../components/CardItem';
import AddIcon from '@material-ui/icons/Add';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import Fab from '@material-ui/core/Fab';

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

function SubjectPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);

  const { materias, loading } = props.materiasReducer;
  const [materiaSelecionada, setMateriaSelecionada] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const { user } = props.userReducer;

  useEffect(() => {
    if (loading) {
      props.getMateriasBackend();
    }
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
    BackendConnection.createUserslog(1, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
      console.log("ok deleted");
    })
  };

  const confirmDelete = (materia) => {
    setOpenDialog(true);
    setMateriaSelecionada(materia);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setMateriaSelecionada(null);
  };

  const renderMaterias = () => {
    return (
      <div>
        {materias.map((materia) => {
          return (
            <div key={materia.idmateria}>
              <CardItem
                text={materia.namemateria}
                showEditIcon={true}
                showDeleteIcon={true}
                editClick={() => updateMateria(materia)}
                deleteClick={() => confirmDelete(materia)}
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
        messageText={'Seguro que desea eliminar esta Materia'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteMateria}
      />

      <h1>Materias</h1>
      {materias.length > 0 ? renderMaterias() : <div />}
      {loading && <h3>Cargando...</h3>}
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newMateria}>
        {fab.icon}
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    materiasReducer: state.materiasReducer,
  };
};

const mapDispathToProps = (dispatch) => ({
  changeMateria: (materia) => dispatch(changeMateria(materia)),
  getMateriasBackend: () => dispatch(getMateriasBackend()),
});

export default connect(mapStateToProps, mapDispathToProps)(withRouter(SubjectPage));
