import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras, getGrupoHorariosBackend, getGruposBackend, getUsers, getSchools, getUsersRol, getRoles } from '../../redux/actions/indexthunk.actions';
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
  const {loading:ldingUsers} = props.usersReducer;
  const {loading:ldingSchools} = props.schoolReducer;
  const {loadingUsersRole,loading:ldingRoles} = props.rolesReducer;
  const [openDialog, setOpenDialog] = useState(false);
  const [grupoSelected, setGrupoSelected] = useState(null);

  useEffect(() => {
    props.getGruposBackend();
    props.getCarreras();
    setTimeout(() => {
      ldingUsers && props.getUsersBackend();     
      ldingSchools && props.getSchools(); 
      loadingUsersRole && props.getUsersRol();
      ldingRoles && props.getRoles();
    }, 1900);
    // eslint-disable-next-line
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
    props.history.push(`${routes.groups}/${grupo.idgrupo}`);
  };

  const deleteGrupo = async () => {
    const { idgrupo } = grupoSelected;
    const gruposByHorario = await BackendConnection.getGrupoHorariosByIdGrupo(idgrupo) ;
    await Promise.all(gruposByHorario.map((grp)=>BackendConnection.deleteGrupoHorario(grp.idgrupohorarios)))
    await BackendConnection.deleteGrupo(idgrupo);
    props.getGruposBackend();
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
                confirmDelete={() => confirmDelete(grupo)}
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
    schoolReducer: state.schoolReducer,
    usersReducer: state.usersReducer,
    rolesReducer: state.rolesReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGrupo: (grupo) => dispatch(changeGrupo(grupo)),
  changeGrupoHorario: (grupoHorario) => dispatch(changeGrupoHorario(grupoHorario)),
  getGruposBackend: () => dispatch(getGruposBackend()),
  getGrupoHorariosBackend: () => dispatch(getGrupoHorariosBackend()),
  getUsersBackend:() => dispatch(getUsers()),
  getSchools: () => dispatch(getSchools()),
  getUsersRol: () => dispatch(getUsersRol()),
  getRoles: () => dispatch(getRoles()),
  getCarreras:() => dispatch(getCarreras()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GroupsPage));
