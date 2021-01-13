import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import { getUsers } from '../../redux/actions/indexthunk.actions';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import FloatingButton from '../../components/FloatingButton';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "auto",
      padding:10,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },   
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
  }));

const Absences = (props) => {
  const classes = useStyles();
  const { user } = props.user;
  const { users,loading:lusers } = props.usersReducer;
  const [openDialog, setOpenDialog] = useState(false);
  const [absence,setAbsence] = useState('');
  const [allAbsences, setAllAbsences] = useState([]);

  useEffect(() => {
    if (props.history.location.pathname === routes.userAbsences) {
      BackendConnection.getAllUsersReport(user.idusers)
        .then((res) => {
          setAllAbsences(res);
        });
    }
    else {
      lusers && props.getUsers();      
      BackendConnection.getAllUsersReport(props.match.params.id)
      .then((res) => {
        setAllAbsences(res);
      });
    }    
    // eslint-disable-next-line
  }, []);

  const NewAbsence = () => {
    props.history.push(routes.newAbsence);
  };

  const seeDetails = (item) => {
    props.history.push(`${routes.userAbsences}/${item.idfalta}`);
  };

  const getDate = (date) => {
    const fecha=new Date(date);
    fecha.setDate(fecha.getDate()+1)
    return fecha.toLocaleDateString();
  };

  const formatedText=(report)=>{
      if(props.history.location.pathname===routes.userAbsences){
        return `Fecha: ${getDate(report.fecha)}`
      }else{
        const u = users.find((i)=>i.idusers===report.users_idusers)
        const texto=`${u.firstname} ${u.lastname}`;
        return texto;
      }
  };
 
  const confirmDelete = (falta) => {
    setOpenDialog(true);
    setAbsence(falta);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const deleteAbsence =  () => {
    BackendConnection.deleteAbsence(absence)
     .then(()=>{
        setOpenDialog(false)
        BackendConnection.getAllUsersReport(user.idusers)
        .then((res) => {
          setAllAbsences(res);
        });
      })
  };

  const mapReports = () => {
      return props.history.location.pathname===routes.userAbsences ? allAbsences.map((item)=>(
        <div  key={item.idfalta} style={{padding:10}}>
          <CardActionArea>
            <CardItem
              text={"Fecha: "+getDate(item.fecha)}
              showEditIcon={true}
              showDeleteIcon={true}
              showIconRow={true}
              deleteClick={() => confirmDelete(item.idfalta)}
              editClick={() => seeDetails(item)}
            />
          </CardActionArea>
        </div>
        ))
        :allAbsences && allAbsences.map((item)=>(
          <div  key={item.idfalta} className={classes.root }>
            <CardActionArea onClick={() => seeDetails(item)}>
              <CardItem
                text={formatedText(item)}
                secondaryText={"Fecha: "+getDate(item.fecha)}
                showEditIcon={false}
                showDeleteIcon={false}
                showIconRow={true}
              />
            </CardActionArea>
          </div>
        ))
  }

  return (
    <div>
      <h1>Faltas</h1>      
      
      {user || users ? mapReports() : (<h3>Cargando...</h3>)}
      {
        props.history.location.pathname === routes.userAbsences &&
        (<FloatingButton onClick={NewAbsence}/>)
      }
      <CustomAlertDialog
        title={'Confirmar borrar falta'}
        messageText={'Seguro que desea eliminar este usuario'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteAbsence}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    usersReducer: state.usersReducer,
    schoolsreducer:state.schoolReducer,
    careersReducer:state.careersReducer,
    gruposReducer:state.grupoReducer,
    materiasReducer:state.materiasReducer,

  };
};
const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Absences));