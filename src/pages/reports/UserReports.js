import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardItem from '../../components/CardItem';
import { makeStyles } from '@material-ui/core/styles';
import { getCarreras,getGruposBackend } from '../../redux/actions/indexthunk.actions';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { routes } from '../../router/RoutesConstants';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const {useState,useEffect} = React;

const useStyles = makeStyles((theme) => ({
  root: {      
    width: "90%", 
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
const UserReports = (props) => {
  const classes=useStyles();
  const { id } = props.match.params;
  const {users} = props.users;  
  const {grupos, grupoHorarios} = props.grupoReducer;
  const {materias} = props.materiasReducer;
  const {careers:carreras,loading:lCarr} = props.carrerasReducer;
  const [grpHor,setGrpHor] = useState([]);
  const [reports,setReports] = useState([]);
  const [arrToMap,setArrToMap] = useState([]);
  const [date,setDate] = useState("");
  const [searchCarr,setSearchCarr] = useState("");
  const [searchMat,setSearchMat] = useState("");
  const [aux,setAux] = useState([]);
  const [typeReport,setTypeReport] = useState("");

  const handleDateChange=(value)=>{
    setDate(value);    
  };
  const searchCarrChange=(value)=>{
    setSearchCarr(value);
  };
  const searchMatChange=(value)=>{
    setSearchMat(value);
  };

  useEffect(() => {
    props.getGrps();
    lCarr && props.getCarreras();   
    datas();
  }, []);

  // useEffect(()=>{    
  //   if(typeReport==="mensual"){
  //     const fecha = new Date(date).getMonth() ;
  //     const ax= arrToMap.filter((item)=>{
  //       fecha1=item.beginweek 
  //     })
  //     let arr = [];
  //     reports.map((report)=>{
  //       if(report.platform!=="falta"&&report.classcontain!=="falta"&&report.observation!=="falta"){
  //         arr.push(45);
  //         arr.push(45);
  //       }
  //     })
  //   }
  // },[typeReport]);

  useEffect(()=>{
    if(grupos.length>0 && users.length>0 && materias.length>0 && carreras.length>0 && grupoHorarios.length>0){
      const a=armarArr(grupoHorarios,reports);
      setArrToMap(a) 
      setAux(a)
    }
  },[reports,grupos,users,materias,carreras,grupoHorarios]);

  const datas=async()=>{
    await BackendConnection.getAllReports()
    .then((res)=>{
      const grpH = grupoHorarios.filter((grpHor)=>grpHor.users_idusers==id);
      const rep=res.filter((rep)=>grpH.some((g)=>g.idgrupohorarios==rep.grupohorarios_idgrupohorarios));
      setGrpHor(grpH);
      setReports(rep)
    })         
  };

  useEffect(() => {
    const r=arrToMap.filter((resp)=>{
      return (resp.carrera.toLowerCase().includes(searchCarr.toLowerCase())) 
      &&(resp.materia.toLowerCase().includes(searchMat.toLowerCase())
      &&(date ==="" ? true:resp.beginweek<date && date<resp.endweek));
    })
    setAux(r);
  }, [date,searchCarr,searchMat]);

  const userName=()=>{
    const user= users.find((user)=>id==user.idusers)
    return (`${user.firstname} ${user.lastname}`);
  };

  const armarArr=(grpH,rep)=>{
      let arr=[];
      rep.map((re)=>{
        arr.push({idassistance:re.idassistance,beginweek:re.beginweek,endweek:re.endweek,dia:obtDia(re,grpH),materia:obtMateria(re,grpH),carrera:obtCarrera(re,grpH)})
      });
      return (arr);    
  };

  const obtCarrera=(rep,grpH)=>{    
    const g=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo===grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    const carr= carreras.find((ca)=>mat.carrera_idcarrera==ca.idcarrera)
    return carr.namecarrera;
  };
  const obtMateria=(rep,grpH)=>{
    const g=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo===grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    return mat.namemateria;
  };
  const obtDia=(rep,grpH)=>{
    const dia=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios)
    return dia.dia;
  };

  const seeDetails=(report)=>{
    props.history.push(`${routes.usersList}/user/${id}/report/${report.idassistance}`)
  };
  const handleSelectChange=({target})=>{
    setTypeReport(target.value)
  };
  
  const renderReports=()=>{
    return searchCarr==="" &&searchMat===""&&date==="" ? 
    arrToMap.map((report)=><div key={report.idassistance} className={classes.root}>
      <CardActionArea>
        <CardItem      
          text={"Carrera: "+report.carrera} 
          secondaryText={"Materia: "+report.materia}
          tercerText={"Dia: "+report.dia.toLowerCase()}
          showEditIcon={false}
          showIconRow={true}
          showDeleteIcon={false}
          onClick={()=>seeDetails(report)}
        />
      </CardActionArea>
    </div>)
    :aux.map((report)=><div key={report.idassistance} className={classes.root}>
      <CardActionArea>
        <CardItem      
          text={"Carrera: "+report.carrera} 
          secondaryText={"Materia: "+report.materia}
          tercerText={"Dia: "+report.dia.toLowerCase()}
          showEditIcon={false}
          showIconRow={true}
          showDeleteIcon={false}
          onClick={()=>seeDetails(report)}
        />
      </CardActionArea>
    </div>)
  }

  return (
    <div>
      <h1>Reportes del Usuario: {userName()}</h1>
      <Grid container>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Tipo de Reporte:</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={typeReport}
                  onChange={(e)=>handleSelectChange(e)}
                >            
                  <MenuItem value="semanal">Semanal</MenuItem>
                  <MenuItem value="mensual">Mensual</MenuItem>
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
        <TextField
          id="date"
          label="Seleccione una fecha"
          value={date}
          onChange={({target})=>handleDateChange(target.value)}
          type="date"    
          InputLabelProps={{
            shrink: true,
          }}
        />
        </Grid>
        <Grid item xs={3}>
          <TextField 
            label={"Search..."}
            type="text"
            value={searchCarr}
            helperText={"Filtrar por Carrera"}
            onChange={({target})=>searchCarrChange(target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField 
            label={"Search..."}
            type="text"
            value={searchMat}
            helperText={"Filtrar por Materia"}
            onChange={({target})=>searchMatChange(target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
      </Grid>
      {arrToMap.length>0 ?renderReports():<h2>...Cargando</h2>}
    </div>
  );
};

const mapStateToProps=(state)=>{
  return{
    users:state.usersReducer,
    grupoReducer:state.grupoReducer,
    materiasReducer:state.materiasReducer,
    carrerasReducer:state.careersReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getCarreras:()=>dispatch(getCarreras()),
  getGrps:()=>dispatch(getGruposBackend()),

});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserReports));
