import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import { getCarreras, getGruposBackend } from '../../redux/actions/indexthunk.actions';
import { Button,TextField,  } from '@material-ui/core';
import moment from 'moment';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { DataGrid } from '@material-ui/data-grid';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles  } from '@material-ui/core/styles';
import { useAddClassForm } from '../../constants/formCustomHook/useForm';

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

const { useState, useEffect } = React;

const RegisterAdditionalClass = (props) => {
  const classes = useStyles();
  const { user } = props.user;
  const {grupos, grupoHorarios} = props.grupoReducer;
  const {materias} = props.materiasReducer;
  const {careers:carreras} = props.carrerasReducer;
  const [arrToMap,setArrToMap] = useState([])
  
  const [time,setTime] = useState(new Date('2020-11-12T20:52:08.326Z'));
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createHorarioComplete, setCreateHorarioComplete] = useState(false);
  const [selection,setSelection] = useState("");
  const [userAbsences,setUserAbsences] = useState([]);
  const [selectionValue,setSelectionValue] = useState("")
  const [confirmMsg,setConfirmMsg] = useState('');
  const [someErr,setSomeErr] = useState(false);
  const [date,handleDateChange,dateError,
        setDateError,dateErrorMsg,setDateErrorMsg]
        =useAddClassForm();
  const columns=[
    {field:"id",width: 100},
    {field:"Materia",width: 300},
    {field: "DiaClase",width:300},
    {field:"Carrera",width: 300},    
  ];

  if (createHorarioComplete) {
    props.history.goBack();
  }

  useEffect(() => {
    BackendConnection.getAllUsersReport(user.idusers)
      .then((res)=>{
        setUserAbsences(res);
        BackendConnection.getAllAdditionalReport()
          .then((resp)=>{
            const userGrpHrs=grupoHorarios.filter((grpHor)=>{
              return grpHor.users_idusers==user.idusers
            })                    
            const arr=armarArr(userGrpHrs);
            setArrToMap(arr)
          })
      })
  }, []);

  const armarArr=(userGrpHrs)=>{
    let arr=[];
    userGrpHrs.map((usrGrp)=>{
      arr.push({
        id:usrGrp.idgrupohorarios,
        Materia:obtMat(usrGrp),
        DiaClase:usrGrp.dia,
        Carrera:obtCarr(usrGrp),           
      })
    });
    return (arr);    
  };

  const obtMat=(usrGrp)=>{  
    // const g=userGrpHrs.find((g)=>userReport.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>usrGrp.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    return mat.namemateria;
  
  };

  const obtCarr=(usrGrp)=>{
    // const g=userGrpHrs.find((g)=>userReport.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>usrGrp.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    const carr= carreras.find((ca)=>mat.carrera_idcarrera==ca.idcarrera)
    return carr.namecarrera;
  };

  const registerHorario = () => {
    
    const initDate = time.ts ? new Date(time.ts) : time;

    const initialDate = moment(initDate.toString()).format('hh:mm:ss');
    console.log(parseInt(selection[0]),initialDate,date,selectionValue.idfalta)
    BackendConnection.crearClaseAdicional(parseInt(selection[0]),initialDate,date,selectionValue.idfalta).then(()=>{
      setOpenDialog(false);
      setCreateHorarioComplete(true);
    })
  };
  const renderAbsences=()=>{
    return (userAbsences.map((item)=>{   
      return <MenuItem key={item.idfalta} value={item}>fecha: {new Date(item.fecha).toLocaleDateString()}</MenuItem>
    }))
  };
  const handleDateInicialChange = (date) => {
    setTime(date);
  };
  const cancel = () => {
    props.history.goBack();
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };
  
  const handleInputChange=(val)=>{
    setSelectionValue(val)
  };
  
  const openDialogConfirm=()=>{
    if(date===""){
      setConfirmMsg(<h3 style={{ color: 'red' }}>Seleccione una Fecha</h3>);
      setSomeErr(true);
    }else if(selection===''){
      setConfirmMsg(<h3 style={{ color: 'red' }}>Seleccione un Grupo</h3>);
      setSomeErr(true);

    }else{
      setSomeErr(false);
      setConfirmMsg("Desea enviar solicitud");
    }
    setOpenDialog(true);
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={LuxonUtils}>

      <h1>Clase Adicional</h1>
      
      <TextField 
        type="date"
        helperText={dateErrorMsg}
        style={{width:"200px",margin:"32px"}}
        error={dateError}            
        InputLabelProps={{
          shrink: true,
        }}
        onChange={({target})=>handleDateChange(target.value)}
      />
      <KeyboardTimePicker
        margin="normal"
        id="hora propuesta"
        value={time}
        onChange={handleDateInicialChange}
        label="hora"
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
      />
      </MuiPickersUtilsProvider>

        {arrToMap.length>0 &&
        <div style={{ height: 250, width: '100%' }}>
          <DataGrid  columns={columns} rows={arrToMap} onSelectionChange={(newSelection) => {
            setSelection(newSelection.rowIds);
        }}/>
        </div>
        } 
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Faltas Registradas</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            name="adjuntarFalta"
            value={selectionValue}
            onChange={({target})=>handleInputChange(target.value)}
          >        
            <MenuItem key={0} value={""}>Subir sin falta</MenuItem>
            { userAbsences && renderAbsences() }
          </Select>
          <label>(opcional)</label>
          </FormControl> 
          {
            selectionValue !=="" &&
              (<iframe 
              title="iframe" 
              data="application/pdf" 
              src={selectionValue.archivo} 
              style={{height:"500px",width:"500px"}}/>)
              
            }      
      <Button 
        variant="contained" 
        color="primary" 
        style={{margin:30,float:"right"}} 
        type="submit" 
        onClick={openDialogConfirm}
        >Registrar Clase Adicional</Button>
      <Button 
        variant="contained" 
        color="primary" 
        style={{margin:30,float:"right"}} 
        type="submit" 
        onClick={() => setOpenDialogCancel(true)}>Cancelar</Button>
      <CustomAlertDialog
        title={"Corfirmar Registro"}
        messageText={confirmMsg}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={someErr?'':registerHorario}
      />
      <CustomAlertDialog
        title={"Cancelar"}
        messageText={"Desea volver atras"}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancel}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    users: state.usersReducer,
    grupoReducer: state.grupoReducer,
    materiasReducer: state.materiasReducer,
    carrerasReducer: state.careersReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getCarreras: () => dispatch(getCarreras()),
  getGrps: () => dispatch(getGruposBackend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterAdditionalClass));
