import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import {  getUsers,getGrupoHorariosBackend,getGruposBackend,getCarreras,getMateriasBackend } from '../../redux/actions/indexthunk.actions';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

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
  const {grupos, grupoHorarios} = props.grupoReducer;  
  const {schools} = props.schoolsreducer;
  const classes = useStyles();
  const [search,setSearch] = useState("");
  const [usersFiltered,setUsersFiltered]=useState([]);
  const [careerSelected, setCareerSelected] = useState('');  
  const [userFiltering,setUserFiltering] = useState([]);
  const [schoSelected, setSchoSelected] = useState('');

  useEffect(() => {
      lUSers && props.getUsers();
      props.getGrpHorarios();
      lMat && props.getMaterias();
  },[]);

  const searchOnChange=(val)=>{
    setSearch(val);
    setUsersFiltered(userFiltering.filter(item=>
      `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(val.toLowerCase())
      ));  
  }

  const seeReport=(user)=>{  
    props.history.location.pathname===(routes.userAddClasses)
    ? props.history.push(`${routes.userAddClasses}/user/${user.idusers}`)
    : props.history.push(`${routes.usersList}/user/${user.idusers}`);
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
    const usersFil=[];
    a.map((fab)=>{
      const usrs=users.filter((usr)=>fab.users_idusers==usr.idusers)
      return usersFil.push(usrs);
    });
    setUsersFiltered(res.flat());
    setUserFiltering(res.flat());
    
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
    const usersFil=[];
    a.map((fab)=>{
      const usrs=users.filter((usr)=>fab.users_idusers==usr.idusers)
      return usersFil.push(usrs);
    });
    setUsersFiltered(res.flat());
    setUserFiltering(res.flat());    
  };

  const handleChange=(idSchool)=>{
    filterBySchool(idSchool)
    setSchoSelected(idSchool)
    setCareerSelected('');
  };

  const handleCareerChange=(idCareer)=>{ 
    filterByCareer(idCareer)
    setCareerSelected(idCareer);
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
      {props.history.location.pathname===routes.userAddClasses? <h1>Clases Adicionales</h1> :<h1>Reportes Semanales/Mensuales</h1>}
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
          schoSelected===""? users.map((user) => {
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
          )}):
          search==="" ? userFiltering.map((user) => {
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
          );
        })
        :usersFiltered.map((user) => {
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
          );
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

  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  getGrpHorarios:()=>dispatch(getGrupoHorariosBackend()),
  getMaterias:()=>dispatch(getMateriasBackend()),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UsersList));
