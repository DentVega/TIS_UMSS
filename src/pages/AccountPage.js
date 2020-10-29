import React from 'react';
import { withRouter } from 'react-router-dom';

function AccountPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  return (
    <div>
      <h1>Cuenta del usuario</h1>
    </div>
  );
}

export default withRouter(AccountPage);
