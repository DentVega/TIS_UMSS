import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { getCarreras, getMateriasBackend } from '../../redux/actions/indexthunk.actions';
import { useDescription, useFullNameMateria } from '../../constants/formCustomHook/useForm';
import BackendConnection from '../../api/BackendConnection';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheCreation,
  sCreateMateria,
  sName,
  sTheNameCannotBeEmpty,
  sSubjectAlreadySaved,
  sSubjectCannotNameAsCareer, 
  sTheDescriptionCannotBeEmpty, sDescription,
  sSubjectCannotNameAsSchool,
} from '../../constants/strings';
import { Button, Grid, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NewMateria(props) {
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullNameMateria();
  const [description, handleDescriptionChange, descriptionError, setDescriptionError, descriptionMesasge, setDescriptionErrorMessage] = useDescription();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createMateriaComplete, setCreateMateriaComplete] = useState(false);

  const [careers, setCareers] = useState([]);
  const [careerSelected, setCareersSelected] = useState(0);

  const classes = useStyles();
  const { user } = props.userReducer;
  const { materias } = props.materiasReducer;
  const { schools } = props.schoolReducer;

  useEffect(() => {
    BackendConnection.getCarreras().then((carerras) => {
      if (carerras && carerras.length > 0) {
        setCareersSelected(carerras[0].idcarrera);
        setCareers(carerras);
      }
    });
  }, []);

  if (createMateriaComplete) {
    props.getMateriasBackend();
    props.history.goBack();
  }

  const getSelectedSchool = () => {
    if(schools.length > 0){
      return schools.filter((it) => it.namefacultad == name).length;
    }
   }

  const getSelectedCareer = () => {
    if (careers.length > 0) {
      return careers.filter((it) => it.namecarrera == name).length;
    }
  };

  const getSelectedSubject = () => {
    if (materias.length > 0) {
      return materias.filter((it) => it.namemateria == name).length;
    }
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

  const validName = () => {
    const nameValidIsNoEmpty = !nameError && name.length > 0;
    if (!nameValidIsNoEmpty) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    }

    const descriptionIsNoEmpty = !descriptionError && description.length > 0;
    if (!descriptionIsNoEmpty) {
      setDescriptionErrorMessage(sTheDescriptionCannotBeEmpty);
      setDescriptionError(true);
    }

    if (nameValidIsNoEmpty && descriptionIsNoEmpty) {
      let val = getSelectedSubject();
      if (val > 0) {
        setNameErrorMessage(sSubjectAlreadySaved);
        setNameError(true);
      } else {
        let val2 = getSelectedCareer();
        if (val2 > 0) {
          setNameErrorMessage(sSubjectCannotNameAsCareer);
          setNameError(true);
        } else {
          let val3 = getSelectedSchool();
          if(val3 > 0){
            setNameErrorMessage(sSubjectCannotNameAsSchool);
            setNameError(true);
          }else{
            confirmCreation();
          }
        }
      }
    }
  };

  const registerMateria = () => {
    BackendConnection.createMateria(careerSelected, name, description).then((response) => {
      setOpenDialog(false);
      setCreateMateriaComplete(true);
      let id = response.body.res[0].idmateria;
      let aux = new Date();
      let val = 'idmateria:' + id + ',carrera_idcarrera:' + careerSelected + ',namemateria:' + name;
      BackendConnection.createUserslog(2, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
        console.log('ok');
      });
    });
  };

  const handleChange = (event) => {
    setCareersSelected(event.target.value);
  };

  const renderForm = () => {
    return (
      <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
        <Grid item style={{ textAlign: 'center' }}>
          <h2>{sCreateMateria}</h2>
        </Grid>
        <Grid container direction="row" spacing={4}>
          <Grid item>
            <TextField
              label={sName}
              type="text"
              value={name}
              onChange={({ target }) => handleNameChange(target.value)}
              error={nameError}
              helperText={nameMesasge}
              autoFocus
            />
          </Grid>

          <Grid item>
            <TextField
              label={sDescription}
              type="text"
              value={description}
              onChange={({ target }) => handleDescriptionChange(target.value)}
              error={descriptionError}
              helperText={descriptionMesasge}
              autoFocus
            />
          </Grid>

          {careers.length > 0 && (
            <Grid item>
              <FormControl className={classes.formControl}>
                <InputLabel id="carerra-selecionada">Carrera</InputLabel>
                <Select
                  labelId="carerra-selecionada"
                  id="carerra-selecionada-select"
                  value={careerSelected}
                  onChange={handleChange}>
                  {careers.map((carrera) => {
                    return (
                      <MenuItem key={carrera.idcarrera} value={carrera.idcarrera}>
                        {carrera.namecarrera}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <div id={'content-school'} style={{ height: 700 }}>
      <CustomAlertDialog
        title={sConfirm}
        messageText={sConfirmTheCreation}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={registerMateria}
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

        <Grid item style={{ textAlign: 'center' }}>
          <Grid container direction={'row'} spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={() => setOpenDialogCancel(true)}>
                {sCancel}
              </Button>
            </Grid>

            <Grid item>
              <Button variant="contained" color="primary" type="submit" onClick={validName}>
                {sCreateMateria}
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
    userReducer: state.userReducer,
    materiasReducer: state.materiasReducer,
    careersReducer: state.careersReducer,
    schoolReducer: state.schoolReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCareers: () => dispatch(getCarreras()),
  getMateriasBackend: () => dispatch(getMateriasBackend()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewMateria));
