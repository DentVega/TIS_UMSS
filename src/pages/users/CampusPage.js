import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoles, getUsers } from '../../redux/actions/indexthunk.actions';
import { changeUserSelected } from '../../redux/actions/index.actions';
import CardItem from '../../components/CardItem';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import { sConfirm, sUsers } from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FloatingButton from '../../components/FloatingButton';
import CardUser from './CardUser';

function CampusPage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);

  const { loading, users } = props.usersReducer;
  const [userSelected, setUserSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState('');
  const [usersFiltered, setUsersFiltered] = useState([]);
  const { user } = props.userReducer;

  useEffect(() => {
    if (loading) {
      props.getUsers();
      props.getRoles();
    }
  });

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

    if (userRol) {
      await BackendConnection.deleteUserRol(userSelected.idusers, userRol[0].idroles);
    }

    BackendConnection.deleteUsers(userSelected.idusers)
      .then(() => {
        setOpenDialog(false);
        props.getUsers();
      })
      .catch((e) => console.warn('Error Delete User', e));
    let aux = new Date();
    let val = 'idusers:' + userSelected.idusers + ',firstname:' + userSelected.firstname + ',lastname:' + userSelected.lastname + ',phone:' + userSelected.phone
      + ',email:' + userSelected.email + ',ci:' + userSelected.ci + ',userpassword:' + userSelected.userpassword;
    BackendConnection.createUserslog(1, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
      console.log('ok deleted');
    });
  };

  const confirmDelete = (user) => {
    setOpenDialog(true);
    setUserSelected(user);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setUserSelected(null);
  };

  const searchOnChange = (val) => {
    setSearch(val);
    setUsersFiltered(users.filter(item =>
        `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(val.toLowerCase())
      )
    );
  };
  const renderUser = () => {
    return (
      <div>
        {search === '' ? users.map((user) => {
            return (
              <CardUser
                key={user.idusers}
                user={user}
                confirmDelete={() => confirmDelete(user)}
                updateUser={() => updateUser(user)}
              />
            );
          })
          : usersFiltered.map((user) => {
            return (
              <CardUser
                key={user.idusers}
                user={user}
                confirmDelete={() => confirmDelete(user)}
                updateUser={() => updateUser(user)}
              />
            );
          })
        }
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
      <TextField
        label={'Search...'}
        type="text"
        value={search}
        helperText={'Filtrar por Nombre'}
        onChange={({ target }) => searchOnChange(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
      {users.length > 0 ? renderUser() : <div/>}
      {loading && <h3>Cargando...</h3>}
      <FloatingButton onClick={newUser}/>
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
