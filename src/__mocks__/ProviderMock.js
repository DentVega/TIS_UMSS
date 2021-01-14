import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { store } from '../redux/store/store';

const history = createBrowserHistory();

const ProviderMock = props => (
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        {props.children}
      </Router>
    </BrowserRouter>
  </Provider>
);

export default ProviderMock;
