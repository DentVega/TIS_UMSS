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
import CampusPage from '../pages/CampusPage';
import SchoolPage from '../pages/SchoolPage';
import SubjectPage from '../pages/SubjectsPage';
import ReportsPage from '../pages/ReportsPage';
import SchedulePage from '../pages/SchedulePage';
import GroupsPage from '../pages/GroupsPage';
import AdministratorPage from '../pages/AdministratorPage';
import AccountPage from '../pages/AccountPage';
import RolesPage from '../pages/RolesPage';
import RolePage from '../pages/RolePage';
import RegisterPage from '../pages/RegistrationPage';
const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    paddingLeft: 240
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%'
  },
}));
function RouterMain(props) {
  const classes = useStyles();
  const { user } = props.userReducer;
  return (
    <BrowserRouter>
      <div className={user != null ? classes.root : null}>
        <CustomAppBar currentUser={true} />
        {user && <CustomDrawer />}
        <main className={classes.content}>
          <Toolbar />
          <Route exact={true} path={'/'} component={LoginPage} />
          <Route exact={true} path={routes.registerUser} component={RegisterPage} />
          <Route exact={true} path={routes.login} component={LoginPage} />
          <Route exact={true} path={routes.home} component={HomePage} />
          <Route exact={true} path={routes.campus} component={CampusPage} />
          <Route exact={true} path={routes.school} component={SchoolPage} />
          <Route exact={true} path={routes.subjects} component={SubjectPage} />
          <Route exact={true} path={routes.reports} component={ReportsPage} />
          <Route exact={true} path={routes.schedule} component={SchedulePage} />
          <Route exact={true} path={routes.groups} component={GroupsPage} />
          <Route exact={true} path={routes.administration} component={AdministratorPage} />
          <Route exact={true} path={routes.roles} component={RolesPage}/>
          <Route exact={true} path={routes.newRole} component={RolePage}/>
          <Route exact={true} path={routes.editRole} component={RolePage}/>
          <Route exact={true} path={routes.account} component={AccountPage} />
          <Route exact={true} path={routes.testUi} component={TestUi} />
          <Route exact={true} path={routes.route404} component={NotFoundPage} />
        </main>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(RouterMain);
