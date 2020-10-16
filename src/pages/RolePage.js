import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { enumMenuDrawer } from '../constants/mockData';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function RolePage(props) {
  const cancelCreateRole = () => {

  };

  const createRole = () => {};

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
              <FormControlLabel control={<Checkbox />} label={menu.name} />
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
          <TextField id={'name-rol'} label={'Nombre del Rol'} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3>Lista de accessos</h3>
          {renderListAccess()}
        </Grid>
        <Grid item xs={12}>
          <div>
            <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={cancelCreateRole}>
              Cancel
            </Button>

            <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={createRole}>
              Crear Role
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(RolePage);
