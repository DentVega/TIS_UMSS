import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid, TextField, Button } from '@material-ui/core';
import {projectStorage} from '../../api/Firebase/config';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import {
  sAreYouSureYourWantCancel,
  sConfirm,
} from '../../constants/strings';
import {useFiles} from '../../constants/formCustomHook/useForm'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 700,
    position: 'relative',
    minHeight: 400,
  },
}));

const NewAbsence = (props) => {
  console.log(props)  
  const {user} = props.user
  const [url,setUrl]=useState(null);
  const [file,handleFileChange,handleDateChange,fileError,
    setFileError,fileMessage,setFileMessage,previewSource,
    date,dateError,setDateError,dateErrorMesg,setDateErrorMsg]=useFiles();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);

  const cancelCreateRole = () => {
    props.history.goBack();
  };
  const confirmSend=()=>{
    if(file===null){
      setFileMessage("Introduzca un archivo");
    }else{
      if(date===""){
        setDateErrorMsg("Introduzca una fecha");
        setDateError(true)
      }
      else{
        setOpenDialog(true);
      }
    }    
  };

  const handleStorage=()=>{  
    const storageRef= projectStorage.ref(file.name);
    storageRef.put(file).on('state_changed',(snap)=>{
    },(err)=>{
      console.log("error"+err);
    },async ()=>{
        await storageRef.getDownloadURL()
        .then((res)=>{            
          BackendConnection.createAbsence(user.idusers,date,res)
          .then((res)=>{
            console.log("report Added");
            props.history.goBack();
          }).catch((err)=>console.warn(err))
        })      
    })
  }
  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div >
       <CustomAlertDialog
        title={sConfirm}
        messageText={"Esta seguro que desea enviarlo"}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={handleStorage}
      />
      <CustomAlertDialog
        title={sConfirm}
        messageText={sAreYouSureYourWantCancel}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancelCreateRole}
      />
      <h1>Registrar Falta:</h1>
      <Grid container spacing={6}>
        <Grid xs={12} item container spacing={3} >
          <Grid xs={4} item >
          <TextField
            id="date"
            label="Fecha:"
            type="date"       
            value={date}     
            error={dateError}
            helperText={dateErrorMesg}
            onChange={({target})=>handleDateChange(target.value)}
            InputLabelProps={{
            shrink: true,
            }}
        />
          </Grid>     
          
        </Grid>
          <Grid xs={6} item>
              <h3>Eliga un Documento:</h3>              
            <TextField 
              type="file"                
              error={fileError}            
              onChange={({target})=>handleFileChange(target.files[0])}                
            />
            <br/>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 30 }}
              onClick={cancelCreateRole} 
            >                           
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 30 }}
              onClick={confirmSend}
            >              
              Enviar
            </Button>
          </Grid>
          <Grid xs={6} item>
            {
              previewSource ?
              (<iframe 
              error={fileError}
              title="iframe" 
              data="application/pdf" 
              src={previewSource} 
              style={{height:"500px",width:"500px"}}/>)
              :<h2 style={{color:'red'}}>{fileMessage}</h2>
            }              
          </Grid>
      </Grid>      
    </div>
  );
};

const mapStateToProps = (state)=>{
  return{
  user:state.userReducer,
  };
};
export default connect(mapStateToProps)(withRouter(NewAbsence));
