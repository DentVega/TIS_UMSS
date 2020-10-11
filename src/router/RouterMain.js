import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { routes } from './RoutesConstants';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TestUi from '../pages/TestUi';

function RouterMain() {
  return (
    <BrowserRouter>
      <Route exact={true} path={'/'} component={LoginPage}/>
      <Route exact={true} path={routes.login} component={LoginPage}/>
      <Route exact={true} path={routes.home} component={HomePage}/>
      <Route exact={true} path={routes.testUi} component={TestUi}/>
      <Route exact={true} path={routes.route404} component={NotFoundPage}/>
    </BrowserRouter>
  );
}

export default RouterMain;
