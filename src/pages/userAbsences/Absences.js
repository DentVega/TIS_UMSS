import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import { getUsers } from '../../redux/actions/indexthunk.actions';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import FloatingButton from '../../components/FloatingButton';

const useStyles = makeStyles(() => ({
  root: {
    width: 1150,
    padding: 10,
  },
}));

const Absences = (props) => {
  sessionStorage.setItem('path', props.history.location.pathname);
  const classes = useStyles();
  const { user } = props.user;
  const { users } = props.usersReducer;
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState([]);
  const [userReports, setUserReports] = useState([]);

  useEffect(() => {
    if (props.history.location.pathname === '/account/absences') {
      BackendConnection.getAllUsersReport(user.idusers)
        .then((res) => {
          setUserReports(res);
          setUserFilter([0]);
        });
    }
    if (props.history.location.pathname === '/reports/Absences') {
      props.getUsers();
      BackendConnection.getAllAbsences()
        .then((res) => {
          setUserReports(res);
          users && setUserFilter(users);
        });
    }
  }, []);

  const NewAbsence = () => {
    props.history.push('/account/newAbsence');
  };

  const seeDetails = (item) => {
    props.history.push(`${routes.userAbsences}/${item.idfalta}`);
  };

  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatedText = (report) => {
    if (props.history.location.pathname === '/reports/Absences' && users.length > 0) {
      const u = search === ''
        ? users.find((i) => i.idusers === report.users_idusers)
        : userFilter.find((i) => i.idusers === report.users_idusers);
      const texto = `${u.firstname} ${u.lastname}`;
      return texto;
    }
    if (props.history.location.pathname === '/account/absences') {
      return 'Fecha: ' + `${getDate(report.fecha)}`;
    }
  };

  const searchOnChange = (val) => {
    setSearch(val);
    setUserFilter(users.filter(item =>
        `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(val.toLowerCase())
      )
    );
  };

  const mapReports = () => {
    let arr = [];
    if (search !== '') {
      userReports.forEach(i => {
        const u = userFilter.find(j => j.idusers === i.users_idusers);
        u !== undefined && arr.push(i);
      });
    }
    return props.history.location.pathname === '/account/absences' ? userReports.map((item) => (
        <div key={item.idfalta} style={{ width: 600, padding: 10 }}>
          <CardActionArea>
            <CardItem
              text={'Fecha: ' + getDate(item.fecha)}
              showEditIcon={false}
              showDeleteIcon={false}
              showIconRow={true}
              onClick={() => seeDetails(item)}
            />
          </CardActionArea>
        </div>
      ))
      : search > '' ? arr.map((item) => (
          <div key={item.idfalta} className={classes.root}>
            <CardActionArea>
              <CardItem
                text={formatedText(item)}
                secondaryText={'Fecha: ' + getDate(item.fecha)}
                showEditIcon={false}
                showDeleteIcon={false}
                showIconRow={true}
                onClick={() => seeDetails(item)}
              />
            </CardActionArea>
          </div>
        )
      ) : userReports.map((item) => (
        <div key={item.idfalta} className={classes.root}>
          <CardActionArea>
            <CardItem
              text={formatedText(item)}
              secondaryText={'Fecha: ' + getDate(item.fecha)}
              showEditIcon={false}
              showDeleteIcon={false}
              showIconRow={true}
              onClick={() => seeDetails(item)}
            />
          </CardActionArea>
        </div>));
  };


  return (
    <div>
      <h1>Ausencias</h1>
      {props.history.location.pathname === '/reports/Absences' &&
      <TextField
        label={'Search...'}
        type="text"
        value={search}
        helperText={'Filtrar por Nombre'}
        onChange={({ target }) => searchOnChange(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />}
      {user ? mapReports() : (<h3>Cargando...</h3>)}
      {
        props.history.location.pathname === '/account/absences' &&
        (<FloatingButton onClick={NewAbsence}/>)
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    usersReducer: state.usersReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Absences));
