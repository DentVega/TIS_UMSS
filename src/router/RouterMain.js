import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { routes } from './RoutesConstants';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TestUi from '../pages/TestUi';
import CustomAppBar from '../components/appBar/CustomAppBar';
import CustomDrawer from '../components/customDrawer/CustomDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CampusPage from '../pages/users/CampusPage';
import SchoolPage from '../pages/schools/SchoolPage';
import SubjectPage from '../pages/materias/SubjectsPage';
import SchedulePage from '../pages/horarios/SchedulePage';
import GroupsPage from '../pages/grupos/GroupsPage';
import AdministratorPage from '../pages/AdministratorPage';
import AccountPage from '../pages/AccountPage';
import RolesPage from '../pages/role/RolesPage';
import RolePage from '../pages/role/RolePage';
import RegisterPage from '../pages/users/RegistrationPage';
import UserslogPage from '../pages/UserslogPage';
import CustomBottombar from '../components/toolbar/CustomBottombar';
import Toolbar from '@material-ui/core/Toolbar';
import { PrivateRoute } from '../constants/PrivateRoute';
import UniversityCareers from '../pages/universityCareers/UniversityCareers';
import NewSchoolPage from '../pages/schools/NewSchoolPage';
import EditSchoolPage from '../pages/schools/EditSchoolPage';
import UserslogViewPage from '../pages/userslog/UserslogViewPage';
import NewUniversityCareers from '../pages/universityCareers/NewUniversityCareers';
import EditUniversityCareers from '../pages/universityCareers/EditUniversityCareers';
import NewMateria from '../pages/materias/NewMateria';
import EditarMateria from '../pages/materias/EditarMateria';
import Absences from '../pages/userAbsences/Absences';
import Reports from '../pages/reports/Reports';
import NewAbsence from '../pages/userAbsences/NewAbsence';
import Absence from '../pages/userAbsences/Absence';
import NewHorario from '../pages/horarios/NewHorario';
import EditHorario from '../pages/horarios/EditHorario';
import NewGrupo from '../pages/grupos/NewGrupos';
import EditGrupo from '../pages/grupos/EditGrupo';
import RegisterProgress from '../pages/weeklyProgressLog/RegisterProgress';
import UsersList from '../pages/reports/UsersList';
import UserReports from '../pages/reports/UserReports';
import Report from '../pages/reports/Report';
import AdditionalClassList from '../pages/weeklyProgressLog/AdditionalClassList';
import RegisterAdditionalClass from '../pages/weeklyProgressLog/RegisterAdditionalClass';
import UserAddClasses from '../pages/additionalClass/UserAddClasses'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100%',
  },
  bottombar: {
    position: 'relative',
    bottom: 0,
    zIndex: 10,
  },
}));
function RouterMain(props) {
  const classes = useStyles();
  const { user } = props.userReducer;
  let isAuth = user != null;
  return (
    <BrowserRouter>
      <div className={user != null ? classes.root : null}>
        <CustomAppBar currentUser={true} />
        {user && <CustomDrawer />}
        <main className={classes.content}>
          <Toolbar />
          <Route exact={true} path={'/'} component={LoginPage} />
          <Route exact={true} path={routes.login} component={LoginPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.home} component={HomePage} />
          {/*Users*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.campus} component={CampusPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerUser} component={RegisterPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editUser} component={RegisterPage} />
          {/*Career*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.career} component={UniversityCareers} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerCareer} component={NewUniversityCareers} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editCareer} component={EditUniversityCareers} />
          {/*School*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.school} component={SchoolPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerSchool} component={NewSchoolPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editSchool} component={EditSchoolPage} />
          {/*Subject*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.subjects} component={SubjectPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerMateria} component={NewMateria} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editMateria} component={EditarMateria} />
          {/*Reportes*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.reports} component={Reports} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userReport} component={Report} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.reportsByUser} component={UserReports} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.absencesReports} component={Absences} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.usersList} component={UsersList} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userAddClasses} component={UsersList} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userClasses} component={UserAddClasses} />
          {/*Horarios*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.schedule} component={SchedulePage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerHorario} component={NewHorario} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editHorario} component={EditHorario} />
          {/*Grupos*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.groups} component={GroupsPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerGroups} component={NewGrupo} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editGroups} component={EditGrupo} />
          {/*Admnistracion*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.administration} component={AdministratorPage} />
          {/*Roles*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.roles} component={RolesPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.newRole} component={RolePage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.editRole} component={RolePage} />
          {/*userslog*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userslog} component={UserslogPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userslogView} component={UserslogViewPage} />
          {/*Account*/}
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.account} component={AccountPage} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userAbsences} component={Absences} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.userAbsence} component={Absence} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.newAbsence} component={NewAbsence} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.testUi} component={TestUi} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerProgress} component={RegisterProgress} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.additionalClassList} component={AdditionalClassList} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.registerAdditionalClass} component={RegisterAdditionalClass} />
          <PrivateRoute isAuth={isAuth} exact={true} path={routes.route404} component={NotFoundPage} />
          
        </main>
      </div>
      {user === null && (
        <div className={classes.bottombar}>
          <CustomBottombar />
        </div>
      )}
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
