import React from 'react';
import { routes } from '../router/RoutesConstants';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function ReportsPage(props) {

  return (
    <div>
      <h1>Reportes</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(withRouter(ReportsPage));
