import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

function SubjectPage() {

  return (
    <div>
      <h1>Materias</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(withRouter(SubjectPage));
