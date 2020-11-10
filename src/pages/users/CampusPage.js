import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoles, getUsers } from '../../redux/actions/indexthunk.actions';
import { changeUserSelected } from '../../redux/actions/index.actions';
import CardItem from '../../components/CardItem';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import { sConfirm, sUsers } from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

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

function CampusPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);

  const { loading, users } = props.usersReducer;
  const [userSelected, setUserSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (loading) {
      props.getUsers();
      props.getRoles();
    }
  });

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };

  const newUser = () => {
    props.changeUserSelected(null);
    props.history.push(routes.registerUser);
  };

  const updateUser = (user) => {
    props.changeUserSelected(user);
    props.history.push(`${routes.campus}/${user.idusers}`);
  };

  const deleteUser = async () => {
    const userRol = await BackendConnection.getUserRolByIdUser(userSelected.idusers);
    await BackendConnection.deleteUserRol(userSelected.idusers, userRol[0].idroles);

    BackendConnection.deleteUsers(userSelected.idusers)
      .then(() => {
        setOpenDialog(false);
        props.getUsers();
      })
      .catch((e) => console.warn('Error Delete User', e));
  };

  const confirmDelete = (user) => {
    setOpenDialog(true);
    setUserSelected(user);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setUserSelected(null);
  };

  const renderUser = () => {
    return (
      <div>
        {users.map((user) => {
          return (
            <div key={user.idusers}>
              <CardItem
                text={user.firstname}
                width={500}
                showEditIcon={true}
                showDeleteIcon={true}
                deleteClick={() => confirmDelete(user)}
                editClick={() => updateUser(user)}
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
        messageText={'Seguro que desea eliminar este usuario'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteUser}
      />
      <h1>{sUsers}</h1>
      {users.length > 0 ? renderUser() : <div />}
      {loading && <h3>Cargando...</h3>}
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newUser}>
        {fab.icon}
      </Fab>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    usersReducer: state.usersReducer,
    rolesReducer: state.rolesReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getRoles: () => dispatch(getRoles()),
  changeUserSelected: (userSelected) => dispatch(changeUserSelected(userSelected)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CampusPage));
