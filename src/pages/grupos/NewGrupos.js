import React, { useEffect, useState } from 'react';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheCreation,
  sCreateGrupo,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { changeGrupoHorario } from '../../redux/actions/index.actions';
import { getGrupoHorariosBackend, getGruposBackend, getSchools } from '../../redux/actions/indexthunk.actions';

const diasConst = [
  {
    dia: 'LUNES',
  },
  {
    dia: 'MARTES',
  },
  {
    dia: 'MIERCOLES',
  },
  {
    dia: 'JUEVES',
  },
  {
    dia: 'VIERNES',
  },
  {
    dia: 'SABADO',
  },
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textError: {
    color: '#ff0000',
  },
}));

function NewGrupo(props) {
  const {schools, loading:ldingSchools} = props.schoolReducer;
  const {usersRole,loadingUsersRole} = props.rolesReducer;
  const {careers} = props.careersReducer;
  const [dias, setDias] = useState(diasConst);
  const [users, setUsers] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [userSelected, setUserSelected] = useState('');
  const [horarioSelected, setHorarioSelected] = useState('');
  const [diaSelected, setDiaSelected] = useState('');
  const [materiaSelected, setMateriaSelected] = useState('');
  const [schoolSelected,setSchoolSelected] = useState('');

  const [horariosBySchool,setHorariosBySchool] = useState([])
  const [materiasBySchool,setMateriasBySchool] = useState([]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createGrupoComplete, setCreateGrupoComplete] = useState(false);  

   const [loadingCampos, setLoadingCampos] = useState(false);

  const classes = useStyles();

  if (createGrupoComplete) {
    // props.getGrupoHorariosBackend();
    props.getGruposBackend();
    props.history.goBack();
  }

  useEffect(() => {
    ldingSchools && props.getSchools();
    if(!ldingSchools && !loadingUsersRole){
      loadData();
    }    
  }, [loadingUsersRole, ldingSchools]);

  const loadData = async () => {
    const usrs = await BackendConnection.getUsers();
    const horarios = await BackendConnection.getHorarios();
    const materias = await BackendConnection.getMaterias();

    setDiaSelected(dias[0].dia);
    const rolDocentes = usersRole.filter((usrRole)=>usrRole.roles_idroles==123) 
    // const userDocentes = [];
    setUsers(rolDocentes.map((roldoc)=>{
      return usrs.find((usr)=>roldoc.users_idusers==usr.idusers);      
    }))
    
    setMaterias(materias);
    setHorarios(horarios);
  };

  useEffect(()=>{
    if(users.length>0 && !loadingCampos && careers.length>0 && horarios.length>0){ 
      setUserSelected(users[0].idusers)
      handleSchool(schools[0].idfacultad)
      setLoadingCampos(true);
    }
  },[users, careers, horarios]);
  
  
  const cancel = () => {
    props.history.goBack();
  };

  const confirmCreation = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleHorario = (event) => {
    setHorarioSelected(event.target.value);
  };

  const registerGrupo = async () => {
    const grupoCreado = await BackendConnection.createGrupo(materiaSelected);
    const { idgrupo } = grupoCreado.body.res[0];
    await BackendConnection.createGrupoHorario(
      horarioSelected,
      idgrupo,
      userSelected,
      diaSelected,
    );

    setOpenDialog(false);
    setCreateGrupoComplete(true);
  };

  const renderHorarios = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="horario-selecionada">Horario</InputLabel>
        <Select
          labelId="horario-selecionada"
          id="horario-selecionada-select"
          value={horarioSelected}
          onChange={handleHorario}>
          {horariosBySchool && horariosBySchool.map((horario) => {
            return (
              <MenuItem key={horario.idhorario} value={horario.idhorario}>
                inicio: {horario.horaini} - fin: {horario.horafin}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const handleUsers = (event) => {
    setUserSelected(event.target.value);
  };

  const renderUsers = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="Usuario-selecionada">Docentes</InputLabel>
        <Select
          labelId="Usuario-selecionada"
          id="Usuario-selecionada-select"
          value={userSelected}
          onChange={handleUsers}>
          {users.map((user) => {
            return (
              <MenuItem key={user.idusers} value={user.idusers}>
                {user.firstname} {user.lastname}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const handleDia = (event) => {
    setDiaSelected(event.target.value);
  };

  const renderDia = () => {
    return (
      <FormControl className={classes.formControl}>
<<<<<<< HEAD
        <InputLabel id="Dia-selecionada">Dia</InputLabel>
        <Select labelId="Dia-selecionada" 
          id="Dia-selecionada-select" 
          value={diaSelected} 
          onChange={handleDia}>
=======
        <InputLabel id="Dia-selecionada">Día</InputLabel>
        <Select labelId="Dia-selecionada" id="Dia-selecionada-select" value={diaSelected} onChange={handleDia}>
>>>>>>> 56dba3e288f5ff71ec3bed6a6633df900f6c13c8
          {dias.map((dia) => {
            return (
              <MenuItem key={dia.dia} value={dia.dia}>
                {dia.dia}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const handleMateria = (event) => {
    setMateriaSelected(event.target.value);
  };
  const getMateriasBySchool =(idSchool)=>{
    const materiasFacultad=[];
    const schoolCareers=careers.filter((carr)=>carr.facultad_idfacultad==idSchool);
    schoolCareers.map((scCareer)=>{
      const subjects=materias.filter((mat)=>mat.carrera_idcarrera==scCareer.idcarrera);
      materiasFacultad.push(subjects)
    });
    setMateriasBySchool(materiasFacultad.flat())
  };
  const handleSchool=(val)=>{
    const filteredSchedule = horarios.filter((hor)=>hor.facultad_idfacultad==val);
    getMateriasBySchool(val)
    setHorariosBySchool(filteredSchedule);
    setSchoolSelected(val);
    setHorarioSelected('');
    setMateriaSelected('');
  };

  const renderFacultades = () =>{
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="Facultad-selecionado">Facultad</InputLabel>
        <Select labelId="Facultad-selecionado" 
          id="Facultad-selecionada-select" 
          value={schoolSelected} 
          onChange={({target})=>handleSchool(target.value)}>
          {schools.map((school) => {
            return (
              <MenuItem key={school.idfacultad} value={school.idfacultad}>
                {school.namefacultad}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  const renderMateria = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="Materia-selecionada">Materia</InputLabel>
        <Select
          labelId="Materia-selecionada"
          id="Materia-selecionada-select"
          value={materiaSelected}
          onChange={handleMateria}>
          {materiasBySchool.map((materia) => {
            return (
              <MenuItem key={materia.idmateria} value={materia.idmateria}>
                {materia.namemateria}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <div>
      <CustomAlertDialog
        title={sConfirm}
        messageText={sConfirmTheCreation}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={registerGrupo}
      />
      <CustomAlertDialog
        title={sConfirm}
        messageText={sAreYouSureYourWantCancel}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancel}
      />

      <h3>Nuevo Grupo</h3>
      {!loadingCampos && <h3>Cargando...</h3>}
      {loadingCampos && renderFacultades()}
      <div className={{ height: 20 }} />
      {loadingCampos && renderHorarios()}
      <div className={{ height: 20 }} />
      {loadingCampos && renderUsers()}
      
      <div className={{ height: 20 }} />
      {loadingCampos && renderDia()}
      <div className={{ height: 20 }} />
      {loadingCampos && renderMateria()}
      <div className={{ height: 50 }} />
      <Grid container direction={'row'} spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" type="submit" onClick={() => setOpenDialogCancel(true)}>
            {sCancel}
          </Button>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" type="submit" onClick={confirmCreation}>
            {sCreateGrupo}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    grupoReducer: state.grupoReducer,
    schoolReducer: state.schoolReducer,
    rolesReducer: state.rolesReducer,
    careersReducer: state.careersReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGrupoHorario: (grupoHorario) => dispatch(changeGrupoHorario(grupoHorario)),
  getGruposBackend: () => dispatch(getGruposBackend()),
  getGrupoHorariosBackend: () => dispatch(getGrupoHorariosBackend()),
  getSchools: ()=> dispatch(getSchools()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewGrupo));
