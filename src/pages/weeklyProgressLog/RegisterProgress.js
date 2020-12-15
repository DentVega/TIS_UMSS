import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import { makeStyles  } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux';
import BackendConnection from '../../api/BackendConnection';
import { Button, Divider, Grid, TextField } from '@material-ui/core';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
}));

const RegisterProgress = (props) => {
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const {user} = props.userReducer;
  const [idGr, setIdGr] = useState('');
  const [allGroups,setAllGroups] = useState([]);
  const [unduplicated,setUnduplicated] = useState([]);
  const [uniqueGr,setUniqueGr] = useState([]);
  const [inputFields,setInputFields] = useState([]);
  const [openDialog,setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [beginWeek,setBeginWeek] = useState("");
  const [endWeek,setEndWeek] = useState("");
  const [materiaName,setMateriaName] = useState("");
  const [error,setError] = useState(false);
  const [userReports,setUserReports] = useState([]);

  useEffect(()=>{
    BackendConnection.getGrupoHByUserId(user.idusers)
      .then((res)=>{
        setAllGroups(res);
        setUnduplicated(res.reduce((acc, current) => {
            const x = acc.find(item => item.grupo_idgrupo === current.grupo_idgrupo);
            return !x ? acc.concat([current]) : acc;        
          }, [])
        );        
      })
      BackendConnection.getAllUsersReport(user.idusers)
        .then((res)=>{
        setUserReports(res);
      })
  },[]);

  useEffect(()=>{
    let arr=[];
    uniqueGr.map(()=>{
      arr.push({plataforma:"",avance:"",observaciones:"",firma:"",adjuntarFalta:""});
    })
    setInputFields(arr);
  },[idGr]);

  const handleChange = async (val) => {
    setInputFields([]);
    setEndWeek("");
    setBeginWeek("");
    setIdGr(val);
    BackendConnection.getGruposbyId(val).then((res)=>{
      BackendConnection.getMateriasById(res[0].materia_idmateria).then((resp)=>{
        setMateriaName(resp[0].namemateria);
      })
    })    
    setUniqueGr(allGroups.filter((item)=>{
       return item.grupo_idgrupo ===val && item;
    }))
  };
  
  const renderGrp=()=>{
    return (unduplicated.map((item)=>{
       return <MenuItem key={item.idgrupohorarios} value={item.grupo_idgrupo}>Grupo N° {item.grupo_idgrupo}</MenuItem> }))
  };

  const handleInputChange=(ev,ind)=>{
    const values=[...inputFields];
    values[ind][ev.target.name]=ev.target.value;
    setInputFields(values);
  };

  const postAvance=(item,index)=>{
    return BackendConnection.registrarAvance(uniqueGr[index].idgrupohorarios,
      beginWeek,endWeek,
      item.plataforma===""? "falta":item.plataforma,
      item.avance==="" ? "falta":item.avance,
      item.observaciones==="" ? "falta":item.falta,
      item.firma==="" ? "falta":item.firma,
    )
  };

  const Register=()=>{        
    Promise.all(inputFields.map((item,index)=>{
      return (postAvance(item,index));  
      
    })).then((res)=>{
      inputFields.map((item,index)=>{
        return (BackendConnection.registroReporteAdicional(res[index].body.res[0].idassistance,item.adjuntarFalta));       
      })  
      setOpenDialog(false);
      })
    .catch(err=>console.log(err))
  };

  const openConfirm=()=>{
    inputFields.map((i)=>{    
      beginWeek.length===0|endWeek===0? setError(true):setOpenDialog(true);
    })
  };

  const cancel = () => {
    props.history.goBack();
  };

  const renderAbsences=()=>{
    return (userReports.map((item)=>{   
      return <MenuItem key={item.idfalta} value={item.archivo}>fecha: {new Date(item.fecha).toLocaleDateString()}</MenuItem>
    }))
  };

 
  const renderTables=()=>{
    if(inputFields.length>0){
    return uniqueGr.map((item,index)=>{
      return <Grid key={item.idgrupohorarios} container item spacing={2} >          
        <Grid item xs={true} align="middle">      
          <h3>{item.dia}</h3>
        </Grid>
        <Grid item xs={true} align="middle" >
          <TextField 
            value={inputFields[index].plataforma} 
            name="plataforma" variant="filled" 
            label="Plataforma" 
            onChange={(e)=>handleInputChange(e,index)}              
          />
        </Grid>
        <Grid item xs={true} align="middle">
          <TextField 
          value={inputFields[index].avance} 
          variant="filled" 
          label="Avance" 
          name="avance" 
          onChange={(e)=>handleInputChange(e,index)}            
        />
        </Grid>
        <Grid item xs={true} align="middle">
          <TextField 
            value={inputFields[index].observaciones} 
            variant="filled" 
            label="Observaciones" 
            name="observaciones" 
            onChange={(e)=>handleInputChange(e,index)}            
          />
        </Grid>
        <Grid item xs={true} align="middle">
          <TextField 
            value={inputFields[index].firma} 
            variant="filled" 
            label="Firma" 
            name="firma" 
            onChange={(e)=>handleInputChange(e,index)}              
          />
        </Grid>
        <Grid item xs={true} align="middle">
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Faltas Registradas</InputLabel>
          <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={inputFields[index].adjuntarFalta}
              name="adjuntarFalta"
              onChange={(e)=>handleInputChange(e,index)}
            >        
            { unduplicated && renderAbsences() }
          </Select>
          </FormControl>
        </Grid>
    </Grid>

    })
  }
  }

  return (
    <div>
      <h1>Registra tu Avance Semanal</h1>
      <Grid container spacing={1}>
        <Grid item xs={3} align="middle">
          <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Seleccione un Grupo</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={idGr}
              onChange={({target})=>handleChange(target.value)}
            >        
            { unduplicated && renderGrp() }
            </Select>
          </FormControl>
          </Grid>
        <Grid item xs={4} align="middle" justify="center">        
          <h1><label>Materia: </label>{materiaName}</h1>
        </Grid>
          <Grid  container item xs={5} >
            <Grid item xs={6} align="middle" justify="center" >
              <TextField
                id="date"
                label="de fecha:"
                type="date"    
                value={beginWeek}     
                onChange={({target})=>setBeginWeek(target.value)}
                InputLabelProps={{
                shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} align="middle" justify="center">
              <TextField 
                id="date"
                type="date" 
                InputLabelProps={{
                  shrink: true,}} 
                label="a fecha:" 
                value={endWeek}
                onChange={({target})=>setEndWeek(target.value)}
              />
            </Grid>
          </Grid>
        </Grid>     
        <Divider />
      <Grid container spacing={1}>
        <Grid container item spacing={2}>          
          <Grid item xs={true} align="middle">      
            <h2>Día</h2>
          </Grid>
          <Grid item xs={true} align="middle">
            <h2>Platafroma o Medio Utilizado</h2>
          </Grid>
          <Grid item xs={true} align="middle">
            <h2>Avance de la clase</h2>
          </Grid>
          <Grid item xs={true} align="middle">
            <h2>Observaciones</h2>
          </Grid>
          <Grid item xs={true} align="middle">
            <h2>Firma</h2>
          </Grid>
          <Grid item xs={true} align="middle">
            <h2>Adjuntar falta</h2>
          </Grid>
        </Grid>
          {uniqueGr.length>0 && renderTables()} 
      </Grid>
      <Divider />
      <Button variant="contained" color="primary" style={{margin:30,float:"right"}} type="submit" onClick={()=>openConfirm()}>Registrar Avance</Button>
      <Button variant="contained" color="primary" style={{margin:30,float:"right"}} type="submit" onClick={()=>setOpenDialogCancel(true)}>Cancelar</Button>
      <CustomAlertDialog
        title={"Confirmar"}
        messageText={"Desea realizar el registro"}
        open={openDialog}
        handleClose={() =>setOpenDialog(false)}
        handleAccept={()=>Register()}
      />
      <CustomAlertDialog
        title={"Confirmar"}
        messageText={"Desea cancelar registro"}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancel}
      />
      <CustomAlertDialog
        title={<label style={{color:"red"}}><span class="myspan"></span>ERROR</label>}
        messageText={<label style={{color:"red"}}><span class="myspan"></span>Seleccione Fechas</label>}
        open={error}
        handleClose={() => setError(false)}
        handleAccept={()=>setError(false)}
      />
    </div>
  );
};

const mapStateToProps=(state)=>{
  return{
    userReducer:state.userReducer,
  }
};

export default connect(mapStateToProps)(withRouter(RegisterProgress));
