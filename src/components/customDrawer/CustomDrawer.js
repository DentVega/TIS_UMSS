import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeUser, openDrawer } from '../../redux/actions/index.actions';
import { enumMenuDrawer } from '../../constants/mockData';
import { routes } from '../../router/RoutesConstants';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import GroupIcon from '@material-ui/icons/Group';
import DomainIcon from '@material-ui/icons/Domain';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import StorageIcon from '@material-ui/icons/Storage';
import { colorMain } from '../../constants/colors';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    background: colorMain,
    height: '100%',
  },
}));

function CustomDrawer(props) {
  const { openDrawer } = props.appReducer;
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {roleFuncs}=props.roleFun;
  const {userRole}=props.rolesReducer;
  let userFunctions= [],menuAdmin=[];
  if(roleFuncs!==null && userRole!==null && roleFuncs !==undefined && userRole !== undefined){
    roleFuncs.map(r=>r.roles_idroles===userRole.idroles&&userFunctions.push(r.funcion_idfuncion));
  }
  if(userFunctions !==[]){
    menuAdmin.push(enumMenuDrawer.home)
    userFunctions.includes(enumMenuDrawer.campus.id) && menuAdmin.push(enumMenuDrawer.campus);
    userFunctions.includes(enumMenuDrawer.school.id) && menuAdmin.push(enumMenuDrawer.school);
    userFunctions.includes(enumMenuDrawer.career.id) && menuAdmin.push(enumMenuDrawer.career);
    userFunctions.includes(enumMenuDrawer.subjects.id) && menuAdmin.push(enumMenuDrawer.subjects);
    userFunctions.includes(enumMenuDrawer.schedule.id) && menuAdmin.push(enumMenuDrawer.schedule);
    userFunctions.includes(enumMenuDrawer.reports.id) && menuAdmin.push(enumMenuDrawer.reports);
    userFunctions.includes(enumMenuDrawer.groups.id) && menuAdmin.push(enumMenuDrawer.groups);
    userFunctions.includes(enumMenuDrawer.administration.id) && menuAdmin.push(enumMenuDrawer.administration);
    userFunctions.includes(enumMenuDrawer.account.id) && menuAdmin.push(enumMenuDrawer.account);

    userFunctions.includes(enumMenuDrawer.userslog.id) && menuAdmin.push(enumMenuDrawer.userslog)
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const openPage = (id) => {
    switch (id) {
      case 0:
        props.history.push(routes.home);
        break;
      case 1:
        props.history.push(routes.campus);
        break;
      case 2:
        props.history.push(routes.school);
        break;
      case 3:
        props.history.push(routes.subjects);
        break;
      case 4:
        props.history.push(routes.reports);
        break;
      case 5:
        props.history.push(routes.schedule);
        break;
      case 6:
        props.history.push(routes.groups);
        break;
      case 7:
        props.history.push(routes.roles);
        break;
      case 8:
        props.history.push(routes.account);
        break;
      case 9:
        props.history.push(routes.career);
        break;
      case 10:
        props.history.push(routes.userslog);
        break;
      default:
        props.history.push(routes.home);
        return null;
    }
  };

  const getIcons = (id) => {
    switch (id) {
      case 0:
        return <HomeIcon style={{ color: '#ffffff' }} />;
      case 1:
        return <AssignmentIndIcon style={{ color: '#ffffff' }} />;
      case 2:
        return <DomainIcon style={{ color: '#ffffff' }} />;
      case 4:
        return <DescriptionIcon style={{ color: '#ffffff' }} />;
      case 5:
        return <WatchLaterIcon style={{ color: '#ffffff' }} />;
      case 6:
        return <GroupIcon style={{ color: '#ffffff' }} />;
      case 7:
        return <SettingsApplicationsIcon style={{ color: '#ffffff' }} />;
      case 8:
        return <AccountCircleIcon style={{ color: '#ffffff' }} />;
      case 9:
        return <StorageIcon style={{ color: '#ffffff' }}/>
      case 10:
        return <StorageIcon style={{ color: '#ffffff' }}/>
      default:
        return <HomeIcon style={{ color: '#ffffff' }} />;
    }
  };

  const list = (anchor) => (
    <div
      className={classes.drawerContainer}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {menuAdmin.map((menuItem) => (
          <ListItem button key={menuItem.id} onClick={() => openPage(menuItem.id)}>
            {getIcons(menuItem.id)}
            <div style={{ width: 10 }} />
            <ListItemText primary={menuItem.nameEs} style={{ color: '#ffffff' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const anchor = 'left';
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      open={openDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}>
      <Toolbar />
      {list(anchor)}
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  return {
    appReducer: state.app,
    userReducer: state.userReducer,
    roleFun:state.roleFuncsReducer,
    rolesReducer:state.rolesReducer,

  };
};

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
  changeUser: (user) => dispatch(changeUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomDrawer));
