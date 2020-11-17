import React,{useEffect, useState} from 'react';
import{withRouter} from 'react-router-dom'; 
import Fab from '@material-ui/core/Fab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import AddIcon from '@material-ui/icons/Add';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import {  getUsers } from '../../redux/actions/indexthunk.actions';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
const useStyles = makeStyles((theme) => ({
    root: {      
      width: 400, 
      padding:10,     
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }));

  const Absences = (props)=>{
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const {user}=props.user;
  const {users}= props.usersReducer
  const [search,setSearch]=useState("");
  const [userFilter,setUserFilter]=useState([]);
  const fab = {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    };
  const [userReports,setUserReports]=useState([]);
  useEffect(() => {
    if(props.history.location.pathname==="/account/absences"){
      BackendConnection.getAllUsersReport(user.idusers)
        .then((res)=>{
        setUserReports(res);
        setUserFilter([0]) 
      })
    }
    if(props.history.location.pathname==='/reports'){
      back();   
    }    
  }, []);

  const back=async()=>{
    props.getUsers();
      await BackendConnection.getAllAbsences()
      .then((res)=>{
        setUserReports(res);
        users&&setUserFilter(users);
      })
  }
  const NewAbsence=()=>{
    props.history.push('/account/newAbsence')
  }

  const seeDetails=(item)=>{   
    props.history.push(`${routes.userAbsences}/${item.idfalta}`);    
  }

  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  }
  
  const formatedText=(report)=>{
    if(search===""){
      if(props.history.location.pathname==='/reports'){
        const u= users.find((i)=>i.idusers===report.users_idusers);
        const texto= "Fecha: "+`${getDate(report.fecha)}`+" "+"Usuario: "+`${u.firstname}`+" "+`${u.lastname}`;      
        return texto;
      }    
      if(props.history.location.pathname==="/account/absences"){      
        return "Fecha: "+`${getDate(report.fecha)}` 
      }
    }else{
      const u= userFilter.find((i)=>i.idusers===report.users_idusers);
      const texto= "Fecha: "+`${getDate(report.fecha)}`+" "+"Usuario: "+`${u.firstname}`+" "+`${u.lastname}`;      
      return texto; 
    }    
  }
  
  const searchOnChange=(val)=>{  
    setSearch(val);
    setUserFilter(users.filter(item=>{
        const te=item.firstname.toLowerCase().includes(val.toLowerCase())||item.lastname.toLowerCase().includes(val.toLowerCase());
        return te;
        })
    );    
  }
  
  const mapReports=()=>{
    let arr=[];
    if(search!==""){  
      userReports.forEach(i=>{
        const u=userFilter.find(j=>j.idusers===i.users_idusers)
        u!==undefined&&arr.push(i);
        })          
    }
      return search==="" ? userReports.map((item)=>(
        <div  key={item.idfalta} className={classes.root }>
          <CardActionArea>
            <CardItem      
              text={formatedText(item)}  
              showEditIcon={false}
              showDeleteIcon={false}
              onClick={()=>seeDetails(item)}
            />
          </CardActionArea>
        </div>
        ))      
     :arr.map((item)=>(
      <div  key={item.idfalta} className={classes.root }>
        <CardActionArea>
          <CardItem      
            text={formatedText(item)}  
            showEditIcon={false}
            showDeleteIcon={false}
            onClick={()=>seeDetails(item)}
          />
        </CardActionArea>
      </div>
      )
     )
  }
  return(
      <div>
          <h1>Ausencias</h1>
          {props.history.location.pathname==='/reports'&&<TextField 
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
          />}       
             {users.length>0?mapReports():(<h3>Cargando...</h3>)}
        { 
          props.history.location.pathname==="/account/absences" &&
          (<Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={NewAbsence}>
              {fab.icon}
          </Fab>)
        }
      </div>
  )
};

const mapStateToProps = (state)=>{
  return{
    user:state.userReducer,
    usersReducer: state.usersReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Absences));