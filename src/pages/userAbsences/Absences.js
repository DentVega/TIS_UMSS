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

  const Absences =(props)=>{
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const {user}=props.user;
  const fab = {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    };
  const [userReports,setUserReports]=useState(null);
  useEffect(() => {
    if(props.history.location.pathname==="/account/absences"){
      BackendConnection.getAllUsersReport(user.idusers)
        .then((res)=>{
        setUserReports(res);
      })
    }
    if(props.history.location.pathname==='/reports'){
      BackendConnection.getAllAbsences()
      .then((res)=>{
        setUserReports(res);
      })
    }
  }, [])
  const NewAbsence=()=>{
    props.history.push('/account/newAbsence')
  }

  const seeDetails=(item)=>{
    console.log(item)
    props.history.push(`${routes.userAbsences}/${item.idfalta}`);    
  }

  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  }
  return(
      <div>
          <h1>Ausencias</h1>
        {
          userReports && userReports.map((item)=>(
          <div  key={item.idfalta} className={classes.root }>
            <CardActionArea>
              <CardItem      
                text={`Fecha:  ${getDate(item.fecha)}`}            
                showEditIcon={false}
                showDeleteIcon={false}
                onClick={()=>seeDetails(item)}
              />
            </CardActionArea>
          </div>
          ))
        }
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
  };
};
export default connect(mapStateToProps)(withRouter(Absences));