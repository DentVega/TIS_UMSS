import * as React from 'react';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Grid, TextField } from '@material-ui/core';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import {  getUsers } from '../../redux/actions/indexthunk.actions';
import {  getGrupoHorariosBackend,getGruposBackend } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { getMateriasBackend } from '../../redux/actions/indexthunk.actions';

const {useState,useEffect} = React;

const useStyles = makeStyles((theme) => ({
  root: {      
    width: 400, 
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

const ReportsWeeklyMonthly = (props) => {
  sessionStorage.setItem('path', props.history.location.pathname);
  const {users}= props.usersReducer;
  const {grupoHorarios}=props.grupoReducer;
  const {grupos} = props.grupoReducer;
  const {materias} = props.materiasReducer;
  const classes = useStyles();
  const [reports,setReports] = useState([]);
  const [dateSelected,setDateSelected] = useState("");
  const [typeReport,setTypeReport] = useState("");

  useEffect(()=>{
    BackendConnection.getAllReports().then((res)=>{
      props.getUsers();
      props.getGrpHorarios();
      props.getGrps();
      props.getMaterias();
      setReports(res);
    })
  },[])

  const handleDateChange=(val)=>{
    setDateSelected(val)
  };

  const search=()=>{
    if(typeReport==="semanal"){
    BackendConnection.getReportsByWeek(dateSelected)
      .then((res)=>{
        setReports(res);
      })
      .catch(err=>{
        console.warn(err)
      })
    }
  };



  const handleSelectChange=({target})=>{
    setTypeReport(target.value)
  };

  const findName=(report,i)=>{
    if(users.length>0 && grupoHorarios.length>0 && grupos.length>0 && materias.length>0 && reports.length>0){
      const grpHorObj=grupoHorarios.find((grpHor)=>grpHor.idgrupohorarios===report.grupohorarios_idgrupohorarios);
      const user=users.find((usr)=>usr.idusers===grpHorObj.users_idusers);
      const grpObj=grupos.find((grp)=>grp.idgrupo===grpHorObj.grupo_idgrupo)
      const mat=materias.find((materia)=>materia.idmateria===grpObj.materia_idmateria)
      return `${user.firstname} ${user.lastname} ${mat.namemateria} ${report.sign}`
    }
  };

  const renderReports=()=>{
    if(reports.length>0){
    return reports.map((report,i)=>
      <div key={report.idassistance} className={classes.root}>
        <CardActionArea>
          <CardItem      
            text={findName(report,i)}  
            showEditIcon={false}
            showDeleteIcon={false}
          />
        </CardActionArea>
      </div>
    )}
  };

  return (
    <div>
      <h1>Reportes Semanales/Mensuales</h1>
      <Grid container>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Tipo de Reporte:</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={typeReport}
              onChange={handleSelectChange}
            >            
              <MenuItem value="semanal">Semanal</MenuItem>
              <MenuItem value="mensual">Mensual</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="date"
            label="Seleccione una fecha"
            type="date"    
            onChange={({target})=>handleDateChange(target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
        <Button 
          variant="contained" 
          color="primary" 
          type="submit"
          onClick={search}
        >
          Buscar
        </Button>                
        </Grid>
      </Grid>
      {reports.length>0 ? renderReports():<h2>Loading...</h2>}
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
  getGrps:()=>dispatch(getGruposBackend()),
  getMaterias:()=>dispatch(getMateriasBackend()),
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ReportsWeeklyMonthly));
