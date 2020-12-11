import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import {  getUsers,getGrupoHorariosBackend,getGruposBackend,getCarreras,getMateriasBackend } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const {useState,useEffect} = React;

const useStyles = makeStyles((theme) => ({
  root: {      
    width: "70%", 
    padding:10,     
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

const UsersList = (props) => {
  sessionStorage.setItem('path', props.history.location.pathname);
  const {users,loading:lUSers}= props.usersReducer;
  const {materias,loading:lMat} = props.materiasReducer;
  const classes = useStyles();
  const [search,setSearch] = useState("");
  const [usersFiltered,setUsersFiltered]=useState([]);
  
  useEffect(() => {
      lUSers && props.getUsers();
      props.getGrpHorarios();
      lMat && props.getMaterias();
  },[]);

  const searchOnChange=(val)=>{
    setSearch(val);
    setUsersFiltered(users.filter(item=>
      `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(val.toLowerCase())
      ));  
  }

  const seeReport=(user)=>{   
    props.history.push(`${routes.usersList}/user/${user.idusers}`);
  };

  return (
    <div>
      <h1>Reportes Semanales/Mensuales</h1>
      <TextField 
        label={"Search..."}
        type="text"
        value={search}
        helperText={"Filtrar por Nombre"}
        onChange={({target})=>searchOnChange(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <div>
        {search==="" ? users.map((user) => {
          return (
            <div key={user.idusers} className={classes.root}>
            <CardActionArea>            
              <CardItem
                text={`${user.firstname} ${user.lastname}`}
                showIconRow={true}
                onClick={()=>seeReport(user)}
              />
             </CardActionArea>
            </div>
          );
        })
        :usersFiltered.map((user) => {
          return (
            <div key={user.idusers} className={classes.root}>
            <CardActionArea>
              <CardItem
                text={`${user.firstname} ${user.lastname}`}
                showIconRow={true}
                onClick={()=>seeReport(user)}
              />
             </CardActionArea>
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state)=>{
  return{
    user:state.userReducer,
    usersReducer: state.usersReducer,
    grupoReducer:state.grupoReducer,
    materiasReducer:state.materiasReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getGrpHorarios:()=>dispatch(getGrupoHorariosBackend()),
  getMaterias:()=>dispatch(getMateriasBackend()),
  getCarreras:()=>dispatch(getCarreras()),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UsersList));
