import React from 'react';
import { withRouter } from 'react-router-dom';
import CardItem from '../components/CardItem';
import { makeStyles } from '@material-ui/core/styles';
import { routes } from '../router/RoutesConstants';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {},
}));

function AdministratorPage(props) {
  const classes = useStyles();
  const goToRoles = () => props.history.push(routes.roles);

  return (
    <div className={classes.content}>
      <h1>Administración</h1>
      <div>
        <CardItem text={'Roles'} showIconRow={true} width={400} onClick={goToRoles} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps)(withRouter(AdministratorPage));
