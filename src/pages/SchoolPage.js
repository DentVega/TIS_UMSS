import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sSchools } from '../constants/strings';

function SchoolPage() {

  return (
    <div>
      <h1>{sSchools}</h1>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(withRouter(SchoolPage));
