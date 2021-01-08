import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import {  getUsers,getGrupoHorariosBackend,getMateriasBackend } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { changeFacultadFiltro, changeCarreraFiltro, changeUsuarioFiltro } from '../../redux/actions/index.actions';

const {useState,useEffect} = React;

const useStyles = makeStyles((theme) => ({
  root: {      
    width: "70%", 
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

const UsersList = (props) => {
  const {users,loading:lUSers}= props.usersReducer;
  const {materias,loading:lMat} = props.materiasReducer;
  const {careers} = props.carrerasReducer;
  const {grupos,loadingGrupos:lgrp, grupoHorarios,loadingGrupoHorarios:lGrpHor} = props.grupoReducer;  
  const {schools} = props.schoolsreducer;
  const {facultadSeleccionada,carreraSeleccionada,usuarioSeleccionado} = props.filtersReducer;
  const classes = useStyles();
  const [search,setSearch] = useState("");
  const [usersFiltered,setUsersFiltered]=useState([]);
  const [careerSelected, setCareerSelected] = useState('');  
  const [schoSelected, setSchoSelected] = useState('');
  const [arrToMap, setArrToMap] = useState([]);
  const [loadedSelects,setLoadedSelects] = useState(false);

  useEffect(() => {
      lUSers && props.getUsers();
      lgrp && props.getGrpHorarios();
      lMat && props.getMaterias();
      lGrpHor && props.getGrpHorarios();
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    if(users&&materias&&careers&&grupos&&grupoHorarios&&schools){
      setArrToMap(users);
      setUsersFiltered(users);     
    };    
    // eslint-disable-next-line
  }, [users,materias,careers,grupos,grupoHorarios,schools])
  
  useEffect(() => {
    if(loadedSelects===false){
      if(facultadSeleccionada!=0){
        handleChange(facultadSeleccionada);        
        if(carreraSeleccionada!=0){
          handleCareerChange(carreraSeleccionada);
          if(usuarioSeleccionado!=="") searchOnChange(usuarioSeleccionado);          
        }else if(usuarioSeleccionado!==""){
        searchOnChange(usuarioSeleccionado);
      }
      }else if(usuarioSeleccionado!==""){
        searchOnChange(usuarioSeleccionado);
      }    
    }
    return ()=>usersFiltered.length>0 && setLoadedSelects(true);  
    // eslint-disable-next-line
  }, [usersFiltered])
  

  const searchOnChange=(val)=>{
    setSearch(val);
    props.changeUsuarioSeleccionado(val);
    setArrToMap(usersFiltered.filter(item=>
      `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(val.toLowerCase())
    ));  
  }

  const seeReport=(user)=>{  
    props.history.location.pathname===(routes.userAddClasses) && props.history.push(`${routes.userAddClasses}/user/${user.idusers}`)
    props.history.location.pathname===(routes.usersList) && props.history.push(`${routes.usersList}/user/${user.idusers}`);
    props.history.location.pathname===(routes.absencesReports) && props.history.push(`${routes.absencesReports}/user/${user.idusers}`);
  };
  
  const filterBySchool=(idSchool)=>{
    const materiasFacultad=[];
    const schoolCareers=careers.filter((carr)=>carr.facultad_idfacultad==idSchool);
    schoolCareers.map((scCareer)=>{
      const subjects=materias.filter((mat)=>mat.carrera_idcarrera==scCareer.idcarrera);
      materiasFacultad.push(subjects)
    });
    const subjectGroups=[];
    materiasFacultad.flat().map((subject)=>{
      const subjs=grupos.filter((grupo)=>grupo.materia_idmateria==subject.idmateria);
      subjectGroups.push(subjs);
    });
    const schoolGrpH=[];
    subjectGroups.flat().map((sbjGrps)=>{
      const grpHor=grupoHorarios.filter((grph)=>grph.grupo_idgrupo==sbjGrps.idgrupo)
      schoolGrpH.push(grpHor);
    });
    const schUsers=[];
    schoolGrpH.flat().map((scGrp)=>{
      const faltas=users.filter((user)=>user.idusers==scGrp.users_idusers)
      schUsers.push(faltas);
    });
    const a=schUsers.flat()   
    let hash = {};
    let res = a.filter(o => hash[o.idusers] ? false : hash[o.idusers] = true);
    setUsersFiltered(res)
    setArrToMap(res);
  };

  const filterByCareer=(idCareer)=>{
    const subjects=materias.filter((mat)=>mat.carrera_idcarrera==idCareer);
    const subjectGroups=[];
    subjects.map((subject)=>{
      const subjs=grupos.filter((grupo)=>grupo.materia_idmateria==subject.idmateria);
      subjectGroups.push(subjs);
    });

    const careerGrpHor=[];
    subjectGroups.flat().map((sbjGrps)=>{
      const grpHor=grupoHorarios.filter((grph)=>grph.grupo_idgrupo==sbjGrps.idgrupo)
      careerGrpHor.push(grpHor);
    });

    const careerUsers=[];
    careerGrpHor.flat().map((scGrp)=>{
      const usersList=users.filter((user)=>user.idusers==scGrp.users_idusers)
      careerUsers.push(usersList);
    });
    
    const a=careerUsers.flat()   
    let hash = {};
    let res = a.filter(o => hash[o.idusers] ? false : hash[o.idusers] = true);
    setUsersFiltered(res)
    setArrToMap(res);
    
  };

  const handleChange=(idSchool)=>{
    filterBySchool(idSchool);
    setSchoSelected(idSchool);
    setCareerSelected("");
    setSearch("");
    props.changeFacultadSeleccionada(idSchool);
    props.changeCarreraSeleccionada(0);
    props.changeUsuarioSeleccionado("");
  };

  const handleCareerChange=(idCareer)=>{ 
    filterByCareer(idCareer)
    setCareerSelected(idCareer);
    setSearch("");
    props.changeCarreraSeleccionada(idCareer);
    props.changeUsuarioSeleccionado("");
  };

  const renderSchools=()=>{
    return (schools.map((school)=>{   
      return <MenuItem key={school.idfacultad} value={school.idfacultad}>{school.namefacultad}</MenuItem>
    }))
  };

  const renderCareers=()=>{
    return (careers.map((career)=>{     
      return career.facultad_idfacultad==schoSelected && (<MenuItem key={career.idcarrera} value={career.idcarrera}>{career.namecarrera}</MenuItem>)
    }))
  };

  return (
    <div>
      {props.history.location.pathname===routes.userAddClasses && <h1>Clases Adicionales</h1>}
      {props.history.location.pathname===routes.usersList && <h1>Reportes Semanales/Mensuales</h1>}
      {props.history.location.pathname===routes.absencesReports && <h1>Faltas</h1>}
      <Grid container>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Facultades</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name="facultades"
                value={schoSelected}
                onChange={({target})=>handleChange(target.value)}
              >        
              {schools && renderSchools()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Carreras</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                name="carreras"
                value={careerSelected}
                onChange={({target})=>handleCareerChange(target.value)}
              >             
              {careers && renderCareers()}
              </Select>
            </FormControl>
          </Grid>
        <Grid item xs={4}>
          <TextField 
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
          />
        </Grid>
      </Grid>
      <div>
        {
          arrToMap && arrToMap.map((user) => {
            return (
              <div key={user.idusers} className={classes.root}>
              <CardActionArea>            
                <CardItem
                  text={`${user.firstname} ${user.lastname}`}
                  showIconRow={true}
                  onClick={()=>seeReport(user)}
                />
              </CardActionArea>
              </div>
            )
          })        
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state)=>{
  return{
    user:state.userReducer,
    usersReducer: state.usersReducer,
    grupoReducer:state.grupoReducer,
    materiasReducer:state.materiasReducer,
    carrerasReducer: state.careersReducer,
    schoolsreducer:state.schoolReducer,
    filtersReducer:state.filtersReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getGrpHorarios:()=>dispatch(getGrupoHorariosBackend()),
  getMaterias:()=>dispatch(getMateriasBackend()),
  changeFacultadSeleccionada:(facultadSeleccionada)=>dispatch(changeFacultadFiltro(facultadSeleccionada)),
  changeCarreraSeleccionada:(carreraSeleccionada)=>dispatch(changeCarreraFiltro(carreraSeleccionada)),
  changeUsuarioSeleccionado:(usuarioSeleccionado)=>dispatch(changeUsuarioFiltro(usuarioSeleccionado)),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UsersList));
