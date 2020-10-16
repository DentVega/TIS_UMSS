import React from 'react';
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
import MoreIcon from '@material-ui/icons/MoreVert';
import logoUmss from '../../assets/logoSanSimon.svg';
import PropTypes from 'prop-types';
import { sLogin, sNameUmss, sNotifications, sProfile } from '../../constants/strings';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  const { currentUser } = props;
  const classes = useStyles();
  const [numberNotification, setNumberNotification] = React.useState(0);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {};

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
          <Badge badgeContent={numberNotification} color="secondary">
            <NotificationsIcon />
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
          <AccountCircle />
        </IconButton>
        <p>{sProfile}</p>
      </MenuItem>
    </Menu>
  );

  const actions = (
    <div>
      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={numberNotification} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit">
          <AccountCircle />
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit">
          <MoreIcon />
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
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img src={logoUmss} className={classes.logo} alt={'logo-umss'} />
          <Typography variant="h6" noWrap>
            {sNameUmss}
          </Typography>

          <div className={classes.grow} />
          {currentUser ? actions : actionsLogin}
        </Toolbar>
      </AppBar>
      {currentUser && renderMobileMenu}
    </div>
  );
}

CustomAppBar.propTypes = {
  currentUser: PropTypes.any,
};

export default CustomAppBar;
