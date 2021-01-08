import React, { useEffect, useState } from 'react';
import { Container, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import { useFiles } from '../../constants/formCustomHook/useForm';
import { projectStorage } from '../../api/Firebase/config';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:900,
    height:700,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Absence = (props) => {
  const { id } = props.match.params;
  const {user:usr} = props.userReducer;
  const classes=useStyles();
  const [absenceData, setAbsenceData] = useState(null); 
  const [user,setUser]=useState([]);
  const [ open, setOpen ] = useState(false);
  const [ idClassSelected,setIdClassSelected] = useState(null);
  const [file, handleFileChange, handleDateChange, fileError,
    setFileError, fileMessage, setFileMessage, previewSource,
    date, dateError, setDateError, dateErrorMesg, setDateErrorMsg] = useFiles();

  useEffect(() => {      
    BackendConnection.getAbsenceById(id).then(async(res) => {
    setAbsenceData(res);    
    await BackendConnection.getUserById(res[0].users_idusers)
      .then((res)=>{
      setUser(res)
    })
    });      
  }, []);
  const getDate = (date) => {
    let fecha=new Date(date);
    fecha.setDate(fecha.getDate()+1);
    return fecha.toLocaleDateString();
  };
  const getFecha=(date)=>{
    const fecha=new Date(date);
    return fecha.toISOString().substr(0,10);
  };
  const handleClose = () => {
    setOpen(false);    
  };
  const handleOpen = () => {
    setOpen(true);       
  };
  const updateAbsence=()=>{
    if(file!=null){
      const storageRef = projectStorage.ref(file.name);
      storageRef.put(file).on('state_changed', () => {
      }, (err) => {
        console.log('error' + err);
      }, async () => {
        await storageRef.getDownloadURL()
          .then((res) => {
            BackendConnection.updateAbsence(id,absenceData[0].users_idusers,date!==""?date:absenceData[0].fecha,res)
              .then(() => {
                props.history.goBack();
              }).catch((err) => console.warn(err));
          });
      });
    }else{
      BackendConnection.updateAbsence(id,absenceData[0].users_idusers,date!==""?date:absenceData[0].fecha,absenceData[0].archivo)
      .then(() => {
        props.history.goBack();
      }).catch((err) => console.warn(err));
    }
  };
  return (
    <div>
        <h1>ID del Reporte: {id}</h1>
        {user.length>0&&<h2>Usuario: {user[0].firstname} {user[0].lastname}</h2>}
        {user.length>0&&<h2>Correo: {user[0].email}</h2>}
        {user.length>0 && (user[0].idusers==usr.idusers &&
           <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              onClick={()=>handleOpen()}

            >Editar Falta
            </Button>)
        }
        {absenceData && (
          <Container align="center">
            <h2>En Fecha: {getDate(absenceData[0].fecha)}</h2>
            
            <iframe
              title="iframe"
              data="application/pdf"
              src={absenceData[0].archivo}
              style={{ height: '550px', width: '700px' }}
            />
          </Container>
        )}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <TextField
                id="date"
                label="Fecha:"
                type="date"
                value={date}
                error={dateError}
                helperText={dateErrorMesg}
                onChange={({ target }) => handleDateChange(target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <h3>Eliga un Documento:</h3>
              <TextField
                type="file"
                error={fileError}
                onChange={({ target }) => handleFileChange(target.files[0])}
              />
              <Container align="center">
                <iframe
                  title="iframe"
                  data="application/pdf"
                  src={previewSource}
                  style={{ height: '400px', width: '700px' }}
                />
              </Container>
              <Button 
                variant="contained" 
                color="primary" 
                style={{margin:30,float:"right"}} 
                type="submit" 
                onClick={handleClose}
              >
                Cancelar
              </Button>    
              <Button 
                variant="contained" 
                color="primary" 
                style={{margin:30,float:"right"}} 
                type="submit" 
                onClick={updateAbsence}
              >
                Confirmar
              </Button>          
            </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer,
  };
};
export default connect(mapStateToProps)(withRouter(Absence));
