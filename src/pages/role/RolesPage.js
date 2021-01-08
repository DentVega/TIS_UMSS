import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getRoles } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
import Fab from '@material-ui/core/Fab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from 'react-router-dom';
import green from '@material-ui/core/colors/green';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import { changeRole } from '../../redux/actions/index.actions';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { sConfirm } from '../../constants/strings';
import { getUsers } from '../../redux/actions/indexthunk.actions';

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

function RolesPage(props) {
  const { roles, loading } = props.rolesReducer;
  const { getRoles } = props;
  const {getUsers}=props;
  const classes = useStyles();
  const {roleFuncs}=props.roleFun;
  const [roleSelected, setRoleSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if (loading) {
      getRoles();
      getUsers();
    }
  },[]);

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };

  const newRole = () => {
    props.history.push(routes.newRole);
  };
  const deleteRolDependencies=()=>{
    let cont=0;
    let roleFunction=[];
    BackendConnection.getAllUsersRol().then((res)=>{
      if(roleFuncs!==null){
        roleFuncs.forEach(element=>{
          if(element.roles_idroles===roleSelected.idroles){
            roleFunction.push(element);
          };
        })
      }
      roleFunction.forEach((element)=>{
        setTimeout(()=>{
          BackendConnection.deleteRoleFunc(roleSelected.idroles,element.funcion_idfuncion);
        },cont*400)
        cont++;
      })
      res.forEach(element=>{
        if(element.roles_idroles===roleSelected.idroles){
          setTimeout(()=>{
          BackendConnection.deleteUserRol(element.users_idusers,roleSelected.idroles);
        },cont*400)
        }
        cont++;
      })
    })

  }
  const deleteRole = async () => {
    deleteRolDependencies();
    setTimeout(()=>{
      BackendConnection.deleteRole(roleSelected.idroles).then(()=>{
        props.getRoles();
        setOpenDialog(false);
      })
    },5000)
  };

  const updateRole = (rol) => {
    props.history.push(`${routes.roles}/${rol.idroles}`);

    props.changeRole(rol);
  };

  const confirmDelete = (rol) => {
    setOpenDialog(true);
    setRoleSelected(rol);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setRoleSelected(null);
  };

  const renderRoles = () => {
    return (
      <div>

        {roles.map((rol) => {
          return (
            <div key={rol.idroles}>

              <CardItem
                text={rol.rolename}
                width={750}
                showEditIcon={true}
                showDeleteIcon={true}
                editClick={() => updateRole(rol)}
                deleteClick={() => confirmDelete(rol)}
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
        messageText={'Seguro que desea eliminar este Rol'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteRole}
      />
      <h1>Roles</h1>
      {roles.length > 0 ? renderRoles() : <div />}
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newRole}>
        {fab.icon}
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    usersReducer: state.usersReducer,
    rolesReducer: state.rolesReducer,
    roleFun:state.roleFuncsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getRoles: () => dispatch(getRoles()),
  changeRole: (rol) => dispatch(changeRole(rol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RolesPage));
