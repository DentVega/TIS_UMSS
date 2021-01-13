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
    width: "auto", 
    padding:10,     
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
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
  const [aux2,setAux2] = useState([]);
  const [typeReport,setTypeReport] = useState("semanal");
  const [hrsTra,setHrsTra] = useState({
    hrs:0,
    min:0
  })
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

  useEffect(()=>{
    if(grupos.length>0 && users.length>0 && materias.length>0 && carreras.length>0 && grupoHorarios.length>0){
      const a=armarArr(grupoHorarios,reports);
      setArrToMap(a) 
      setAux(a)
      setAux2(a)
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
    setSearchCarr("");
    setSearchMat("")
    if(typeReport==="semanal"){
      const fecha = new Date(date);      
      const r=arrToMap.filter((resp)=>{
        const beginFecha=new Date(resp.beginweek);
        const endFecha=new Date(resp.endweek);
        return ((beginFecha<=fecha && fecha<=endFecha));
      })
      let countAssistences = 0;
      r.map((item)=>{
        const rep=reports.filter((report)=>item.idassistance==report.idassistance);
        if(rep[0].platform!=="falta"&&rep[0].classcontain!=="falta"&&rep[0].observations!=="falta"){
          countAssistences++;
        }
      })
      const totalMins=countAssistences*2*45;
      const hrs=Math.floor(totalMins / 60);
      const min=totalMins%60;      
      setHrsTra({hrs:hrs,min:min})
      setAux(r);
      setAux2(r);
      date===" "&& setAux(arrToMap)
    }
    else{
      const fecha = new Date(date);
      fecha.setDate(fecha.getDate()+1);      
      const ax=arrToMap.filter((item)=>{
        const fecha1 = new Date(item.beginweek).getMonth();
        const fecha2 = new Date(item.endweek).getMonth(); 
        return fecha.getMonth()===fecha1&&fecha.getMonth()===fecha2;
      })
      let countAssistences = 0;
      ax.map((item)=>{
        const rep=reports.filter((report)=>item.idassistance==report.idassistance);
        if(rep[0].platform!=="falta"&&rep[0].classcontain!=="falta"&&rep[0].observations!=="falta"){
          countAssistences++;
        }
      })
      const totalMins=countAssistences*2*45;
      const hrs=Math.floor(totalMins / 60);
      const min=totalMins%60;      
      setHrsTra({hrs:hrs,min:min})
      setAux(ax);
      setAux2(ax);
      date==="" && setAux(arrToMap);
    }    
  }, [date]);

  useEffect(() => {
    const r=aux.filter((resp)=>{
      return (resp.carrera.toLowerCase().includes(searchCarr.toLowerCase())) 
      &&(resp.materia.toLowerCase().includes(searchMat.toLowerCase()))
    })
    setAux2(r);
  }, [searchCarr,searchMat]);

  const userName=()=>{
    const user= users.find((user)=>id==user.idusers)
    return (`${user.firstname} ${user.lastname}`);
  };

  const armarArr=(grpH,rep)=>{
    let arr=[];
    rep.map((re)=>{
      arr.push({
        idassistance:re.idassistance,
        beginweek:re.beginweek,
        endweek:re.endweek,dia:obtDia(re,grpH),
        materia:obtMateria(re,grpH),
        carrera:obtCarrera(re,grpH)
      })
    });
    return (arr);    
  };

  const obtCarrera=(rep,grpH)=>{    
    const g=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    const carr= carreras.find((ca)=>mat.carrera_idcarrera==ca.idcarrera)
    return carr.namecarrera;
  };
  const obtMateria=(rep,grpH)=>{
    const g=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
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
    setDate("");
    setSearchCarr("");
    setSearchMat("");
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
    : searchCarr==="" &&searchMat===""?aux.map((report)=><div key={report.idassistance} className={classes.root}>
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
      :aux2.map((report)=><div key={report.idassistance} className={classes.root}>
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
        <Grid item xs={2}>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">Tipo de Reporte:</InputLabel>
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={typeReport}                  
                  onChange={(e)=>handleSelectChange(e)}
                >            
                  <MenuItem value="semanal" >Semanal</MenuItem>
                  <MenuItem value="mensual">Mensual</MenuItem>
              </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
        <TextField
          id="date"
          label="Seleccione una fecha"
          value={date}
          onChange={({target})=>handleDateChange(target.value)}
          type="date"    
          style={{width:"160px",marginTop:"8px"}}
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
            style={{width:"200px",marginTop:"8px"}}
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
            style={{width:"200px",marginTop:"8px"}}           
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
        <Grid item xs={2}>
          <h2>Horas Trabajadas: {hrsTra.hrs}</h2>
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
