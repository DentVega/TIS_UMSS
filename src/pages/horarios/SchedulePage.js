import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import { getHorariosBackend } from '../../redux/actions/indexthunk.actions';
import { changeHorario } from '../../redux/actions/index.actions';
import CardItem from '../../components/CardItem';
import AddIcon from '@material-ui/icons/Add';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import Fab from '@material-ui/core/Fab';
import { routes } from '../../router/RoutesConstants';
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

function SchedulePage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const { horarios, loading } = props.horarioReducer;
  const [horarioSeleccionado, setHorarioSelecionado] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (loading) {
      props.getHorariosBackend();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newHorarios = () => {
    props.changeHorario(null);
    props.history.push(routes.registerHorario);
  };

  const updateHorario = (horario) => {
    props.changeHorario(horario);
    props.history.push(`${routes.schedule}/${horario.idhorario}`);
  };

  const deleteHorario = () => {
    BackendConnection.deleteHorario(horarioSeleccionado.idhorario).then(() => {
      props.getHorariosBackend();
      setOpenDialog(false);
    });
  };

  const confirmDelete = (horario) => {
    setOpenDialog(true);
    setHorarioSelecionado(horario);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setHorarioSelecionado(null);
  };

  const renderHorarios = () => {
    return (
      <div>
        {horarios.map((horario) => {
          return (
            <div key={horario.idhorario}>
              <CardItem
                text={`Inicio: ${horario.horaini}  -  Fin: ${horario.horafin}`}
                showEditIcon={true}
                showDeleteIcon={true}
                editClick={() => updateHorario(horario)}
                deleteClick={() => confirmDelete(horario)}
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
        messageText={'Seguro que desea eliminar este Horario'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteHorario}
      />

      <h1>Horarios</h1>
      {horarios.length > 0 ? renderHorarios() : <div />}
      {loading && <h3>Cargando...</h3>}
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newHorarios}>
        {fab.icon}
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    horarioReducer: state.horarioReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getHorariosBackend: () => dispatch(getHorariosBackend()),
  changeHorario: (horario) => dispatch(changeHorario(horario)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SchedulePage));
