import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useDescription, useFullName } from '../../constants/formCustomHook/useForm';
import { getCarreras, getSchools } from '../../redux/actions/indexthunk.actions';
import { Button, Grid, TextField } from '@material-ui/core';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheCreation,
  sCreateCareer,
  sName,
  sTheNameCannotBeEmpty,
  sCareerAlreadySaved,
  sCareerCannotNameAsSchool, sDescription, sTheDescriptionCannotBeEmpty,
} from '../../constants/strings';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import BackendConnection from '../../api/BackendConnection';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function NewUniversityCareers(props) {
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullName();
  const [description, handleDescriptionChange, descriptionError, setDescriptionError, descriptionMesasge, setDescriptionErrorMessage] = useDescription();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createCareersComplete, setCreateCareersComplete] = useState(false);

  const [schools, setSchools] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState(0);

  const classes = useStyles();

  const { user } = props.userReducer;

  const { careers } = props.careersReducer;

  useEffect(() => {
    BackendConnection.getSchools().then((schools) => {
      if (schools && schools.length > 0) {
        setSchoolSelected(schools[0].idfacultad);
        setSchools(schools);
      }
    });
  }, []);

  if (createCareersComplete) {
    props.getCareers();
    props.history.goBack();
  }

  const getSelectedSchool = () => {
    if (schools.length > 0) {
      return schools.filter((it) => it.namefacultad === name).length;
    }
  };

  const getSelectedCareer = () => {
    if (careers.length > 0) {
      return careers.filter((it) => it.namecarrera === name).length;
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
      let val = getSelectedCareer();
      if (val > 0) {
        setNameErrorMessage(sCareerAlreadySaved);
        setNameError(true);
      } else {
        let val2 = getSelectedSchool();
        if (val2 > 0) {
          setNameErrorMessage(sCareerCannotNameAsSchool);
          setNameError(true);
        } else {
          confirmCreation();
        }
      }
    }
  };

  const registerCareers = () => {
    let id = 0;
    BackendConnection.createCareer(schoolSelected, name, description).then((response) => {
      setOpenDialog(false);
      setCreateCareersComplete(true);
      id = response.body.res[0].idcarrera;
      let aux = new Date();
      let val = 'idcarrera:' + id + ',facultad_idfacultad:' + schoolSelected + ',namecarrera:' + name;
      BackendConnection.createUserslog(2, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
        console.log('ok inserted');
      });
    });
  };

  const handleChange = (event) => {
    setSchoolSelected(event.target.value);
  };

  const renderForm = () => {
    return (
      <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
        <Grid item style={{ textAlign: 'center' }}>
          <h2>{sCreateCareer}</h2>
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
        handleAccept={registerCareers}
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
                {sCreateCareer}
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
    careersReducer: state.careersReducer,
    schoolReducer: state.schoolReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCareers: () => dispatch(getCarreras()),
  getSchools: () => dispatch(getSchools()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewUniversityCareers));
