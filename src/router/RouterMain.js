import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { routes } from './RoutesConstants';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TestUi from '../pages/TestUi';
import CustomAppBar from '../components/appBar/CustomAppBar';
import CustomDrawer from '../components/customDrawer/CustomDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function RouterMain(props) {
  const classes = useStyles();
  const { openDrawer } = props.app;
  return (
    <BrowserRouter>
      <CustomAppBar currentUser={true} />
      {openDrawer && <CustomDrawer />}
      <main className={classes.content}>
        <Toolbar />
        <Route exact={true} path={'/'} component={LoginPage} />
        <Route exact={true} path={routes.login} component={LoginPage} />
        <Route exact={true} path={routes.home} component={HomePage} />
        <Route exact={true} path={routes.testUi} component={TestUi} />
        <Route exact={true} path={routes.route404} component={NotFoundPage} />
      </main>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps)(RouterMain);
