import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { routes } from '../router/RoutesConstants';

function SchedulePage(props) {
  const { user } = props.userReducer;
  if (user === null) {
    props.history.push(routes.login);
  }

  return (
    <div>
      <h1>Horarios</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(withRouter(SchedulePage));
