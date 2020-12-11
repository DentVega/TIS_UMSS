import React, { useEffect } from 'react';
import { sHome } from '../constants/strings';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUser, openDrawer } from '../redux/actions/index.actions';

import BackendConnection from '../api/BackendConnection';

function HomePage(props) {
  sessionStorage.setItem('path', props.history.location.pathname);
  const { user } = props.userReducer;

  useEffect(() => {
    BackendConnection.createNotificactionByIdUser(user.idusers, 'mensaje de prueba creado', user.email);
  }, [user]);

  return (
    <div>
      <h1>{sHome}</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    roleFun: state.roleFuncsReducer,
    rolesReducer: state.rolesReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
  changeUser: (user) => dispatch(changeUser(user)),
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
