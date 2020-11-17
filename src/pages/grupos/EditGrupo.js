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
  sConfirmTheUpdate,
  sUpdateGrupo,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { changeGrupoHorario } from '../../redux/actions/index.actions';
import { getGrupoHorariosBackend, getGruposBackend } from '../../redux/actions/indexthunk.actions';

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
  const [dias, setDias] = useState(diasConst);
  const [users, setUsers] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);

  const [userSelected, setUserSelected] = useState(null);
  const [horarioSelected, setHorarioSelected] = useState(null);
  const [diaSelected, setDiaSelected] = useState(null);
  const [materiaSelected, setMateriaSelected] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createGrupoComplete, setCreateGrupoComplete] = useState(false);

  const [grupoIdSelected, setGrupoIdSelected] = useState(null);
  const { grupoHorario } = props.grupoReducer;

  const [loadingAllItems, setLoadingAllItems] = useState(false);

  console.log('grupoHorario sELECTES', grupoHorario);

  const classes = useStyles();

  if (createGrupoComplete) {
    props.getGrupoHorariosBackend();
    props.history.goBack();
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const users = await BackendConnection.getUsers();
    const horarios = await BackendConnection.getHorarios();
    const materias = await BackendConnection.getMaterias();

    console.log('materias', materias);

    const { dia, grupo_idgrupo, horario_idhorario, idgrupohorarios, users_idusers } = grupoHorario;

    const grupo = await BackendConnection.getGruposbyId(grupo_idgrupo);

    console.log('grupo Obtenido', grupo[0]);

    const { idgrupo, materia_idmateria } = grupo[0];

    setMateriaSelected(materia_idmateria);
    setHorarioSelected(horario_idhorario);
    setUserSelected(users_idusers);
    setDiaSelected(dia);
    setGrupoIdSelected(idgrupo);

    setUsers(users);
    setMaterias(materias);
    setHorarios(horarios);
    setLoadingAllItems(true);
  };

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
    const { idgrupohorarios } = grupoHorario;

    const grupoCreado = await BackendConnection.updateGrupo(grupoIdSelected, materiaSelected);

    const grupoMateria = await BackendConnection.updateGrupoHorario(
      idgrupohorarios,
      horarioSelected,
      grupoIdSelected,
      userSelected,
      diaSelected,
    );

    console.log('grupoMateria', grupoMateria);
    setOpenDialog(false);
    setCreateGrupoComplete(true);
  };

  const renderHoraios = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="horario-selecionada">Horario</InputLabel>
        <Select
          labelId="horario-selecionada"
          id="horario-selecionada-select"
          value={horarioSelected}
          onChange={handleHorario}>
          {horarios.map((horario) => {
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
          {users.map((user) => {
            return (
              <MenuItem key={user.idusers} value={user.idusers}>
                {user.firstname}
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
        <InputLabel id="Dia-selecionada">Dia</InputLabel>
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
      {loadingAllItems && renderHoraios()}
      <div className={{ height: 20 }} />
      {loadingAllItems && renderUsers()}
      <div className={{ height: 20 }} />
      {loadingAllItems && renderDia()}
      <div className={{ height: 20 }} />
      {loadingAllItems && renderMateria()}
      <div className={{ height: 50 }} />
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    grupoReducer: state.grupoReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeGrupoHorario: (grupoHorario) => dispatch(changeGrupoHorario(grupoHorario)),
  getGruposBackend: () => dispatch(getGruposBackend()),
  getGrupoHorariosBackend: () => dispatch(getGrupoHorariosBackend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditGrupo));
