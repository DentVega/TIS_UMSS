import React, { useEffect, useState } from 'react';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheUpdate,
  sUpdateGrupo,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { changeGrupoHorario } from '../../redux/actions/index.actions';
import { getGrupoHorariosBackend, getGruposBackend, getCarreras } from '../../redux/actions/indexthunk.actions';
import ItemGrupoHorario from './ItemGrupoHorario';
import AddIcon from '@material-ui/icons/Add';

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

function EditGrupo(props) {
  const idgrp = props.match.params.id;
  const [idUser, setIdUser] = useState(0);
  const [usersArr, setUsersArr] = useState([])
  const {roles, usersRole} = props.rolesReducer;

  const [dias, setDias] = useState(diasConst);
  const [users, setUsers] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [userSelected, setUserSelected] = useState('');
  const [horarioSelected, setHorarioSelected] = useState('');
  const [diaSelected, setDiaSelected] = useState('');
  const [materiaSelected, setMateriaSelected] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createGrupoComplete, setCreateGrupoComplete] = useState(false);

  const [grupoIdSelected, setGrupoIdSelected] = useState('');
  const { grupo,grupos } = props.grupoReducer;
  const [loadingAllItems, setLoadingAllItems] = useState(false);

  const [showFormHorario, setShowHorario] = useState(false);
  const [horariosActivados, setHorariosActivados] = useState([]);
  const [schoolSchedule,setSchoolSchedule] = useState([]);

  const {careers} = props.careersReducer;
  
  const {schools} = props.schoolReducer;
  const classes = useStyles();
  

  if (createGrupoComplete) {
    props.getGrupoHorariosBackend();
    props.history.goBack();
  }

  useEffect(() => {
    props.getCarreras();
    loadData();
  }, []);

  const loadData = async () => {
    const users = await BackendConnection.getUsers();
    const horarios = await BackendConnection.getHorarios();
    const materias = await BackendConnection.getMaterias();
    await loadGruposHorarios();

    const { idgrupo, materia_idmateria } = grupo;
    setMateriaSelected(materia_idmateria);
    setGrupoIdSelected(idgrupo);
    
    setUsers(users);
    setMaterias(materias);
    setHorarios(horarios);
  };

  const loadGruposHorarios = async () => {
    const { idgrupo } = grupo;
    const grupoHorarios = await BackendConnection.getGrupoHorariosByIdGrupo(idgrupo);
    setIdUser(grupoHorarios[0].users_idusers)
    if (grupoHorarios && grupoHorarios.length > 0) {
      setHorariosActivados(grupoHorarios);
    }
  };

  useEffect(()=>{
    if(!loadingAllItems && users.length>0 && careers.length>0 && horarios.length>0 && grupos.length > 0 && schools.length > 0 && materias.length > 0){ 
      const group = grupos.find((grp)=>idgrp == grp.idgrupo);
      const subjectGroup = materias.find((materia)=>materia.idmateria == group.materia_idmateria);
      const careerGroup = careers.find((carrera)=>subjectGroup.carrera_idcarrera == carrera.idcarrera);      
      setSchoolSchedule(horarios.filter((schedule)=>careerGroup.facultad_idfacultad == schedule.facultad_idfacultad));
      setLoadingAllItems(true);
    }
    // eslint-disable-next-line
  },[users, grupos, careers, horarios, materias]);

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
    await BackendConnection.updateGrupo(grupoIdSelected, materiaSelected);
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
          {schoolSchedule.map((horario) => {
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
        <InputLabel id="Usuario-selecionada">Usuario</InputLabel>
        <Select
          labelId="Usuario-selecionada"
          id="Usuario-selecionada-select"
          value={userSelected}
          onChange={handleUsers}>
          {
            usersArr.length > 0 && usersArr.map((user) => {
              return (
                <MenuItem key={user.idusers} value={user.idusers}>
                  {user.firstname} {user.lastname}
                </MenuItem>
              );
            })
          }
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
        <InputLabel id="Dia-selecionada">Día</InputLabel>
        <Select labelId="Dia-selecionada" id="Dia-selecionada-select" value={diaSelected} onChange={handleDia}>
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

  const renderMateria = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="Materia-selecionada">Materia</InputLabel>
        <Select
          labelId="Materia-selecionada"
          id="Materia-selecionada-select"
          value={materiaSelected}
          onChange={handleMateria}>
          {materias.map((materia) => {
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

  const renderGeneralData = () => {
    return (
      <Grid item style={{ width: '80vh', borderRadius: '40px' }}>
        <div className={{ height: 20 }}/>
        {loadingAllItems && renderMateria()}
        <div className={{ height: 50 }}/>
      </Grid>
    );
  };

  const deleteGrupoHoario = async (idGrupoHorario) => {
    const grupoHorarios = await BackendConnection.getGrupoHorariosByIdGrupo(idgrp);
    grupoHorarios.length > 1 && await BackendConnection.deleteGrupoHorario(idGrupoHorario);
    loadGruposHorarios();
  };
  
  const handleHorarioAdd=()=>{
    const usersArr=[];
    console.log(idUser);
    const docente=users.length > 0 && (users.find((usr)=>usr.idusers == idUser));
    docente != undefined && usersArr.push(docente);
    const auxiliares = usersRole.filter((userRol)=>userRol.roles_idroles == 101);
    auxiliares.map((aux)=>{
      const usr = users.find((usr)=>aux.users_idusers == usr.idusers);
      usr != undefined && usersArr.push(usr);
    })
    setUsersArr(usersArr);
    setShowHorario(true);
  };

  const renderListHorarios = () => {
    return (
      <Grid item>
        <Grid container alignItems={'center'}>
          <h4>Horarios</h4>
          {!showFormHorario && (
            <IconButton onClick={handleHorarioAdd}>
              <AddIcon/>
            </IconButton>
          )}
        </Grid>
        {
          showFormHorario ? renderFormHorarios() : horariosActivados.map((horarioActivado) => {
            return  <ItemGrupoHorario 
                      key={horarioActivado.idgrupohorarios} 
                      grupoHorario={horarioActivado}
                      materias={materias} 
                      horarios={horarios}
                      deleteClick={(idGrupoHorario) => deleteGrupoHoario(idGrupoHorario)}
                    />;
          })
        }
      </Grid>
    );
  };


  const crearHorario = async () => {
    const { idgrupo } = grupo;
    await BackendConnection.createGrupoHorario(
      horarioSelected,
      idgrupo,
      userSelected,
      diaSelected,    
    );
    await loadGruposHorarios();
    setShowHorario(false);
  };

  const renderFormHorarios = () => {
    return (
      <Grid item>
        {loadingAllItems && renderDia()}
        <div className={{ height: 20 }}/>
        {loadingAllItems && renderHorarios()}
        <div className={{ height: 20 }}/>
        {loadingAllItems && renderUsers()}
        <Grid container direction={'row'} spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" onClick={() => setShowHorario(false)}>
              Cancelar
            </Button>
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" type="submit" onClick={() => crearHorario()}>
              Crear Horario
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <div>
      <CustomAlertDialog
        title={sConfirm}
        messageText={sConfirmTheUpdate}
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

      <h3>Editar Grupo</h3>
      {!loadingAllItems && <h3>Cargando...</h3>}

      <Grid container direction={'column'} spacing={2}>
        <Grid item container direction={'row'}>
          {renderGeneralData()}
          {renderListHorarios()}
        </Grid>

        <Grid item style={{ textAlign: 'center' }}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={() => setOpenDialogCancel(true)}>
                {sCancel}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={confirmCreation}>
                {sUpdateGrupo}
              </Button>
            </Grid>
          </Grid>
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
  getCarreras: () => dispatch(getCarreras()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditGrupo));
