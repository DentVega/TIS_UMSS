import React from 'react';
import { sHome } from '../constants/strings';
import { withRouter } from 'react-router-dom';

function HomePage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  return (
    <div>
      <h1>{sHome}</h1>
    </div>
  );
}



export default withRouter(HomePage);