import React, { useEffect } from 'react';
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
  const classes = useStyles();

  useEffect(() => {
    if (loading) {
      props.getRoles();
    }
  });

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };

  const newRole = () => {
    props.history.push(routes.newRole);
  };

  const deleteRole = (rol) => {
    BackendConnection.deleteRole(rol.idroles)
      .then((response) => {
        console.warn('finish Delete', response);
        props.getRoles();
      })
      .catch((e) => console.warn('Error Delete', e));
  };

  const updateRole = (rol) => {
    props.history.push(`${routes.roles}/${rol.idroles}`);
    props.changeRole(rol);
  };

  const renderRoles = () => {
    return (
      <div>
        {roles.map((rol) => {
          return (
            <div key={rol.idroles}>
              <CardItem
                text={rol.rolename}
                width={500}
                showEditIcon={true}
                showDeleteIcon={true}
                editClick={() => updateRole(rol)}
                deleteClick={() => deleteRole(rol)}
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
    rolesReducer: state.rolesReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRoles: () => dispatch(getRoles()),
  changeRole: (rol) => dispatch(changeRole(rol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RolesPage));
