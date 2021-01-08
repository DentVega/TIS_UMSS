import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGrupoHorariosBackend, getGruposBackend } from '../../redux/actions/indexthunk.actions';
import { changeGrupo, changeGrupoHorario } from '../../redux/actions/index.actions';
import { routes } from '../../router/RoutesConstants';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import BackendConnection from '../../api/BackendConnection';
import GrupoItem from '../../components/GrupoItem';
import FloatingButton from '../../components/FloatingButton';

function GroupsPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const { grupos, grupoHorarios, loadingGrupoHorarios, loadingGrupos } = props.grupoReducer;

  const [openDialog, setOpenDialog] = useState(false);
  const [grupoSelected, setGrupoSelected] = useState(null);

  useEffect(() => {
    props.getGruposBackend();
  }, []);

  const newGrupo = () => {
    props.changeGrupoHorario(null);
    props.history.push(routes.registerGroups);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setGrupoSelected(null);
  };

  const updateGrupo = (grupo) => {
    props.changeGrupo(grupo);
    // props.changeGrupoHorario(grupoHorario);
    props.history.push(`${routes.groups}/${grupo.idgrupo}`);
  };

  const deleteGrupo = async () => {
    const { grupo_idgrupo, idgrupohorarios } = grupoSelected;
    await BackendConnection.deleteGrupoHorario(idgrupohorarios);
    await BackendConnection.deleteGrupo(grupo_idgrupo);

    props.getGrupoHorariosBackend();
    setOpenDialog(false);
  };

  const confirmDelete = (grupo) => {
    setOpenDialog(true);
    setGrupoSelected(grupo);
  };

  const renderGrupos = () => {
    return (
      <div>
        {grupos.map((grupo) => {
          return (
            <div key={grupo.idgrupo}>
              <GrupoItem
                grupoHorario={grupo}
                grupo={grupo}
                updateGrupo={() => updateGrupo(grupo)}
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
      {loadingGrupos && <h3>Cargando...</h3>}
      {grupos.length > 0 ? renderGrupos() : <div />}

      <FloatingButton onClick={newGrupo}/>
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
  changeGrupo: (grupo) => dispatch(changeGrupo(grupo)),
  changeGrupoHorario: (grupoHorario) => dispatch(changeGrupoHorario(grupoHorario)),
  getGruposBackend: () => dispatch(getGruposBackend()),
  getGrupoHorariosBackend: () => dispatch(getGrupoHorariosBackend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupsPage));
