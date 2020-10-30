import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function ReportsPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
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
