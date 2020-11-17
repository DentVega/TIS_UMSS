import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGrupoHorariosBackend, getGruposBackend } from '../../redux/actions/indexthunk.actions';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import CardItem from '../../components/CardItem';
import { changeGrupoHorario } from '../../redux/actions/index.actions';
import { routes } from '../../router/RoutesConstants';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import BackendConnection from '../../api/BackendConnection';
import GrupoItem from '../../components/GrupoItem';

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

function GroupsPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const classes = useStyles();
  const { grupos, grupoHorarios, loadingGrupoHorarios } = props.grupoReducer;

  const [openDialog, setOpenDialog] = useState(false);
  const [grupoSelected, setGrupoSelected] = useState(null);

  useEffect(() => {
    props.getGrupoHorariosBackend();
  }, []);

  const newGrupo = () => {
    props.changeGrupoHorario(null);
    props.history.push(routes.registerGroups);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setGrupoSelected(null);
  };

  const updateGrupo = (grupoHorario) => {
    props.changeGrupoHorario(grupoHorario);
    props.history.push(`${routes.groups}/${grupoHorario.idgrupohorarios}`);
  };

  const deleteGrupo = async () => {
    const { grupo_idgrupo, idgrupohorarios } = grupoSelected;
    console.log('eliminar grupo horario', grupoSelected);
    const deleteGrupoHorarioMessage = await BackendConnection.deleteGrupoHorario(idgrupohorarios);
    console.log('deleteGrupoHorarioMessage', deleteGrupoHorarioMessage);
    const deleteGrupoMessage = await BackendConnection.deleteGrupo(grupo_idgrupo);
    console.log('deleteGrupoMessage', deleteGrupoMessage);

    props.getGrupoHorariosBackend();
    setOpenDialog(false);
  };

  const confirmDelete = (grupo) => {
    setOpenDialog(true);
    setGrupoSelected(grupo);
  };

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };

  const renderGrupos = () => {
    return (
      <div>
        {grupoHorarios.map((grupoHorario) => {
          return (
            <div key={grupoHorario.idgrupohorarios}>
              <GrupoItem
                grupoHorario={grupoHorario}
                updateGrupo={updateGrupo}
                confirmDelete={confirmDelete}
              />
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
        messageText={'Seguro que desea eliminar este Grupo'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteGrupo}
      />

      <h1>Grupos</h1>
      {loadingGrupoHorarios && <h3>Cargando...</h3>}
      {grupoHorarios.length > 0 ? renderGrupos() : <div />}

      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newGrupo}>
        {fab.icon}
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    grupoReducer: state.grupoReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGrupoHorario: (grupoHorario) => dispatch(changeGrupoHorario(grupoHorario)),
  getGruposBackend: () => dispatch(getGruposBackend()),
  getGrupoHorariosBackend: () => dispatch(getGrupoHorariosBackend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupsPage));
