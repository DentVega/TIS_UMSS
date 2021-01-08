import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { routes } from '../../router/RoutesConstants';
import { getUsers } from '../../redux/actions/indexthunk.actions';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import FloatingButton from '../../components/FloatingButton';
const useStyles = makeStyles((theme) => ({
    root: {
      width: 1150,
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
  const { users } = props.usersReducer;
  const {schools} = props.schoolsreducer;
  const {careers} = props.careersReducer;
  const {grupos, grupoHorarios} = props.gruposReducer; 
  const {materias} = props.materiasReducer; 
  const [search, setSearch] = useState('');
  const [userFilter, setUserFilter] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [absence,setAbsence] = useState('');
  const [allAbsences, setAllAbsences] = useState([]);
  const [schoSelected, setSchoSelected] = useState('');
  const [careerSelected, setCareerSelected] = useState('');
  const [userFiltering,setUserFiltering] = useState([]);
  const [filteredAbsences,setFilteredAbsences] = useState([]);

  useEffect(() => {
    if (props.history.location.pathname === routes.userAbsences) {
      BackendConnection.getAllUsersReport(user.idusers)
        .then((res) => {
          setAllAbsences(res);
          setUserFilter([0]);
        });
    }
    if (props.history.location.pathname === routes.absencesReports) {
      props.getUsers();
      BackendConnection.getAllAbsences()
        .then((res) => {
          setAllAbsences(res);
          users && setUserFilter(users);
        });
    }
    
    // eslint-disable-next-line
  }, []);

  useEffect(()=>{
    if(allAbsences && users && schools &&careers && grupos && grupoHorarios && materias){
      
    }
  },[users,schools,careers,grupos,grupoHorarios,materias,allAbsences])

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
      if(props.history.location.pathname===routes.absencesReports && users.length>0){
        const u = search===""
                              ? users.find((i)=>i.idusers===report.users_idusers)
                              : userFilter.find((i)=>i.idusers===report.users_idusers);
        const texto=`${u.firstname} ${u.lastname}`;
        return texto;
      }
      if(props.history.location.pathname===routes.userAbsences){
        return `Fecha: ${getDate(report.fecha)}`
      }
  };
 
  const searchOnChange = (val) => {
    setSearch(val);
    setUserFilter(userFiltering.flat().filter(item =>
        `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(val.toLowerCase())
      )
    );
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
          setUserFilter([0]);
        });
      })
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

  const handleChange=(idSchool)=>{
    filterBySchool(idSchool)
    setSchoSelected(idSchool)
    setCareerSelected('');
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
    const careerAbsences=[];
    schoolGrpH.flat().map((scGrp)=>{
      const faltas=allAbsences.filter((userR)=>userR.users_idusers==scGrp.users_idusers)
      careerAbsences.push(faltas);
    });
    const a=careerAbsences.flat()   
    let hash = {};
    let res = a.filter(o => hash[o.idfalta] ? false : hash[o.idfalta] = true);
    const usersFil=[];
    a.map((fab)=>{
      const usrs=users.filter((usr)=>fab.users_idusers==usr.idusers)
      return usersFil.push(usrs);
    });
    setUserFiltering(usersFil);
    setFilteredAbsences(res)
    
  };

  const filterByCareer=(idCareer)=>{
    const subjects=materias.filter((mat)=>mat.carrera_idcarrera==idCareer);
    const subjectGroups=[];
    subjects.map((subject)=>{
      const subjs=grupos.filter((grupo)=>grupo.materia_idmateria==subject.idmateria);
      subjectGroups.push(subjs);
    });
    const schoolGrpH=[];
    subjectGroups.flat().map((sbjGrps)=>{
      const grpHor=grupoHorarios.filter((grph)=>grph.grupo_idgrupo==sbjGrps.idgrupo)
      schoolGrpH.push(grpHor);
    });
    const careerAbsences=[];
    schoolGrpH.flat().map((scGrp)=>{
      const faltas=allAbsences.filter((userR)=>userR.users_idusers==scGrp.users_idusers)
      careerAbsences.push(faltas);
    });
    const usersFil=[];
    careerAbsences.flat().map((fab)=>{
      const usrs=users.filter((usr)=>fab.users_idusers==usr.idusers)
      return usersFil.push(usrs);
    });
    const a=careerAbsences.flat()   
    let hash = {};
    let res = a.filter(o => hash[o.idfalta] ? false : hash[o.idfalta] = true);
    setUserFiltering(usersFil);
    setFilteredAbsences(res.flat())
  };

  const handleCareerChange=(idCareer)=>{ 
    filterByCareer(idCareer)
    setCareerSelected(idCareer);
  };
  const filterByUser=()=>{
    let arr = [];
    if (search !== '') {
      allAbsences.forEach(i => {
        const u = userFilter.find(j => j.idusers === i.users_idusers);
        u !== undefined && arr.push(i);
      });
    }
    return arr
  };

  const mapReports = () => {
    const arr=filterByUser();

      return props.history.location.pathname===routes.userAbsences ? allAbsences.map((item)=>(
        <div  key={item.idfalta} style={{width:600,padding:10}}>
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
     :schoSelected==="" ? 
      allAbsences.map((item)=>(
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
     :search>""?arr.map((item)=>(
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
      )
     ):filteredAbsences&&filteredAbsences.map((item)=>(
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
      </div>))
  }

  return (
    <div>
      <h1>Faltas</h1>      
      {props.history.location.pathname === routes.absencesReports &&
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
            label={'Search...'}
            type="text"
            value={search}
            helperText={'Filtrar por Nombre'}
            onChange={({ target }) => searchOnChange(target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>}
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