import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { openDrawer } from '../../redux/actions/index.actions';
import { enumMenuDrawer } from '../../constants/mockData';
import { routes } from '../../router/RoutesConstants';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import GroupIcon from '@material-ui/icons/Group';
import DomainIcon from '@material-ui/icons/Domain';
import DescriptionIcon from '@material-ui/icons/Description';
import { white } from 'color-name';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    background: '#2d3540',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const menuAdmin = [
  enumMenuDrawer.home,
  enumMenuDrawer.campus,
  enumMenuDrawer.school,
  enumMenuDrawer.subjects,
  enumMenuDrawer.schedule,
  enumMenuDrawer.reports,
  enumMenuDrawer.groups,
  enumMenuDrawer.administration,
  enumMenuDrawer.account,
];

function CustomDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
        props.openDrawer();
        break;
      case 1:
        props.history.push(routes.campus);
        props.openDrawer();
        break;
      case 2:
        props.history.push(routes.school);
        props.openDrawer();
        break;
      case 3:
        props.history.push(routes.subjects);
        props.openDrawer();
        break;
      case 4:
        props.history.push(routes.reports);
        props.openDrawer();
        break;
      case 5:
        props.history.push(routes.schedule);
        props.openDrawer();
        break;
      case 6:
        props.history.push(routes.groups);
        props.openDrawer();
        break;
      case 7:
        props.history.push(routes.administration);
        props.openDrawer();
        break;
      case 8:
        props.history.push(routes.account);
        props.openDrawer();
        break;
      default:
        props.history.push(routes.home);
        props.openDrawer();
        return null;
    }
  };

  const getIcons = (id) => {
    switch (id) {
      case 0:
        return <HomeIcon style={{ color: white }}/>;
      case 2:
        return <DomainIcon />;
      case 4:
        return <DescriptionIcon />;
      case 5:
        return <WatchLaterIcon />;
      case 6:
        return <GroupIcon />;
      default:
        return <HomeIcon style={{ color: white }}/>;
    }
  };

  const list = (anchor) => (
    <div
      className={classes.drawerContainer}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {menuAdmin.map((menuItem, index) => (
          <ListItem button key={menuItem.id} onClick={() => openPage(menuItem.id)}>
            {getIcons(menuItem.id)}
            <ListItemText primary={menuItem.nameEs} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const anchor = 'left';
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
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
    app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomDrawer));
