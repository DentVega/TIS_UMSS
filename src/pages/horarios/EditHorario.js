import React, { useEffect, useState } from 'react';
import { getHorariosBackend, getSchools } from '../../redux/actions/indexthunk.actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BackendConnection from '../../api/BackendConnection';
import { Button, Grid } from '@material-ui/core';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheUpdate,
  sUpdateHorario,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import 'date-fns';
import 'moment';
import LuxonUtils from '@date-io/luxon';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textError: {
    color: '#ff0000',
  },
}));

function EditHorario(props) {
  const [inicio, setInicio] = useState(new Date('2020-11-12T20:52:08.326Z'));
  const [final, setFinal] = useState(new Date('2020-11-12T20:52:08.326Z'));
  const idHorario = props.match.params.id;
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createHorarioComplete, setCreateHorarioComplete] = useState(false);

  const [schools, setSchools] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState('');

  const [showTextError, setShowTextError] = useState(false);
  const [textError, setTextError] = useState('');

  const classes = useStyles();
          const { horario } = props.horarioReducer;

  useEffect(() => {
    BackendConnection.getSchools().then((schools) => {
      if (schools && schools.length > 0) {
        BackendConnection.getHorariosById(idHorario)
        .then((res)=>{
          setSchools(schools);
          setSchoolSelected(schools.find((school)=>res[0].facultad_idfacultad==school.idfacultad).idfacultad);
          setInicio(new Date(`2020-11-12T${horario.horaini}`));
          setFinal(new Date(`2020-11-12T${horario.horafin}`));
        })
      }
      
    });
  }, []);

  if (createHorarioComplete) {
    props.getHorariosBackend();
    props.history.goBack();
  }

  const cancel = () => {
    props.history.goBack();
  };

  const confirmCreation = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const validHorarios = () => {
    if (final > inicio) {
      setShowTextError(false);
      confirmCreation();
    } else {
      setTextError('El horario inicial debe ser menor al horario mayor');
      setShowTextError(true);
    }
  };

  const registerHorario = () => {
    const initDate = inicio.ts ? new Date(inicio.ts) : inicio;
    const finalDate = final.ts ? new Date(final.ts) : final;

    const initialDate = moment(initDate.toString()).format('hh:mm:ss');
    const endDate = moment(finalDate.toString()).format('hh:mm:ss');

    BackendConnection.updateHorario(horario.idhorario, schoolSelected, initialDate, endDate).then(() => {
      setOpenDialog(false);
      setCreateHorarioComplete(true);
    });
  };

  const handleDateInicialChange = (date) => {
    setInicio(date);
  };

  const handleDateFinalChange = (date) => {
    setFinal(date);
  };

  const handleChange = (event) => {
    setSchoolSelected(event.target.value);
  };

  const renderForm = () => {
    return (
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
          <Grid item style={{ textAlign: 'center' }}>
            <h2>{sUpdateHorario}</h2>
          </Grid>

          <Grid container direction="row" spacing={4}>
            <Grid item>
              <KeyboardTimePicker
                margin="normal"
                id="hora-inicio"
                label="Hora Inicio"
                value={inicio}
                onChange={handleDateInicialChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>

            <Grid item>
              <KeyboardTimePicker
                margin="normal"
                id="hora-final"
                label="Hora Final"
                value={final}
                onChange={handleDateFinalChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </Grid>
          {showTextError && <h3 className={classes.textError}>{textError}</h3>}
        </Grid>
      </MuiPickersUtilsProvider>
    );
  };

  return (
    <div id={'content-school'} style={{ height: 700 }}>
      <CustomAlertDialog
        title={sConfirm}
        messageText={sConfirmTheUpdate}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={registerHorario}
      />
      <CustomAlertDialog
        title={sConfirm}
        messageText={sAreYouSureYourWantCancel}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancel}
      />

      <Grid container direction={'column'} spacing={4}>
        <Grid item container direction={'row'}>
          {renderForm()}
        </Grid>

        <Grid item>
          {schools.length > 0 && (
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="facultad-selecionada">Facultad</InputLabel>
                <Select
                  labelId="facultad-selecionada"
                  id="facultad-selecionada-select"
                  value={schoolSelected}
                  onChange={handleChange}>
                  {schools.map((facultad) => {
                    return (
                      <MenuItem key={facultad.idfacultad} value={facultad.idfacultad}>
                        {facultad.namefacultad}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>

        <Grid item style={{ textAlign: 'center' }}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={() => setOpenDialogCancel(true)}>
                {sCancel}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={validHorarios}>
                {sUpdateHorario}
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
    horarioReducer: state.horarioReducer,
    schoolReducer: state.schoolReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getHorariosBackend: () => dispatch(getHorariosBackend()),
  getSchools: () => dispatch(getSchools()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditHorario));
