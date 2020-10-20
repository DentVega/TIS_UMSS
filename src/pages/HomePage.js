import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routes } from '../router/RoutesConstants';
import { sHome } from '../constants/strings';
function HomePage(props) {
  const { user } = props.userReducer;
  if (user === null) {
    props.history.push(routes.login);
  }

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
  };
};

export default connect(mapStateToProps)(withRouter(HomePage));
