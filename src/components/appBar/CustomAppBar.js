import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import logoUmss from '../../assets/logoSanSimon.svg';
import PropTypes from 'prop-types';
import { sCloseSesion, sLogin, sNameUmss, sNotifications, sProfile } from '../../constants/strings';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { routes } from '../../router/RoutesConstants';
import { changeUser, openDrawer, updateNotifications } from '../../redux/actions/index.actions';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import { getNumberNotificationsByUser } from '../../redux/actions/indexthunk.actions';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 40,
    paddingRight: 15,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function CustomAppBar(props) {
  const { user } = props.userReducer;
  const classes = useStyles();
  const { updateNotification, numberNotifications } = props.notificationsReducer;
  // eslint-disable-next-line no-unused-vars
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (user) {
      props.getNumberNotificationsByUser(user.idusers);
    }
  }, [user]);

  const handleProfileMenuOpen = () => {
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    props.changeUser(null);
    sessionStorage.clear();
    props.history.push(routes.login);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={numberNotifications} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <p>{sNotifications}</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <AccountCircle/>
        </IconButton>
        <p>{sProfile}</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit">
          <ExitToAppIcon/>
        </IconButton>
        <p>{sCloseSesion}</p>
      </MenuItem>
    </Menu>
  );

  const goToNotificaciones = () => {
    props.history.push(routes.notificaciones);
  };

  const actions = (
    <div>
      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={goToNotificaciones}>
          <Badge badgeContent={numberNotifications} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit">
          <AccountCircle/>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleLogout}
          color="inherit">
          <ExitToAppIcon/>
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit">
          <MoreIcon/>
        </IconButton>
      </div>
    </div>
  );

  const actionsLogin = (
    <div>
      <Button color="inherit">{sLogin}</Button>
    </div>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline/>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src={logoUmss} className={classes.logo} alt={'logo-umss'}/>
          <Typography variant="h6" noWrap>
            {sNameUmss}
          </Typography>

          <div className={classes.grow}/>
          {user ? actions : actionsLogin}
        </Toolbar>
      </AppBar>
      {user && renderMobileMenu}
    </div>
  );
}

CustomAppBar.propTypes = {
  currentUser: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    notificationsReducer: state.notificationsReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  openDrawer: () => dispatch(openDrawer()),
  changeUser: (user) => dispatch(changeUser(user)),
  updateNotifications: () => dispatch(updateNotifications()),
  getNumberNotificationsByUser: (idUser) => dispatch(getNumberNotificationsByUser(idUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomAppBar));
