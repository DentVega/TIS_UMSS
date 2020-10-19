import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { enumMenuDrawer } from '../../constants/mockData';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import { changeRole } from '../../redux/actions/index.actions';
import { getRoles } from '../../redux/actions/indexthunk.actions';

function RolePage(props) {
  const [createRoleComplete, setCreateRoleComplete] = useState(false);
  const [updateRoleComplete, setUpdateRoleComplete] = useState(false);
  const [idRole, setIdRole] = useState(null);
  const [nameRole, setNameRole] = useState('');
  const [loadCurrentRole, setLoadCurrentRole] = useState(false);
  const [messageError, setMessageError] = useState(null);

  const { role } = props.rolesReducer;
  if (role != null && !loadCurrentRole) {
    setNameRole(role.rolename);
    setIdRole(role.idroles);
    setLoadCurrentRole(true);
  }
  console.warn('id select role', role);

  const cancelCreateRole = () => {
    props.changeRole(null);
    props.history.goBack();
  };

  const createRole = () => {
    if (nameRole.length === 0) {
      setMessageError('El campo no puede estar vacio');
    } else {
      BackendConnection.createRole(nameRole).then(() => {
        setCreateRoleComplete(true);
      });
    }
  };

  const updateRole = () => {
    if (nameRole.length === 0) {
      setMessageError('El campo no puede estar vacio');
    } else {
      BackendConnection.updateRole(idRole, nameRole).then(() => {
        setUpdateRoleComplete(true);
      });
    }
  };

  if (createRoleComplete || updateRoleComplete) {
    props.getRoles();
    props.history.goBack();
  }

  const menuAdmin = [
    enumMenuDrawer.home,
    enumMenuDrawer.campus,
    enumMenuDrawer.school,
    enumMenuDrawer.subjects,
    enumMenuDrawer.schedule,
    enumMenuDrawer.reports,
    enumMenuDrawer.groups,
    enumMenuDrawer.administration,
    enumMenuDrawer.account,
  ];

  const renderListAccess = () => {
    return (
      <div>
        {menuAdmin.map((menu) => {
          return (
            <div key={menu.id}>
              <FormControlLabel control={<Checkbox color={'#2d3540'} />} label={menu.name} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <h1>Role</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id={'name-rol'}
            label={'Nombre del Rol'}
            value={nameRole}
            error={messageError != null}
            helperText={messageError}
            onChange={({ target }) => setNameRole(target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/*<h3>Lista de accessos</h3>*/}
          {/*{renderListAccess()}*/}
        </Grid>
        <Grid item xs={12}>
          <div>
            <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={cancelCreateRole}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{ margin: 10 }}
              onClick={idRole === null ? createRole : updateRole}>
              {idRole === null ? 'Crear Rol' : 'Editar Rol'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    rolesReducer: state.rolesReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeRole: (rol) => dispatch(changeRole(rol)),
  getRoles: () => dispatch(getRoles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RolePage));
