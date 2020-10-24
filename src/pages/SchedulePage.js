import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function SchedulePage() {

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
