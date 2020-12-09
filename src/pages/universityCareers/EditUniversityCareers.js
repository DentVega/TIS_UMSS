import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras, getSchools } from '../../redux/actions/indexthunk.actions';
import { useFullName } from '../../constants/formCustomHook/useForm';
import BackendConnection from '../../api/BackendConnection';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheUpdate,
  sName,
  sTheNameCannotBeEmpty,
  sUpdateCareer,
} from '../../constants/strings';
import { makeStyles } from '@material-ui/core/styles';
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

function EditUniversityCareers(props) {
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullName();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [updateCareersComplete, setUpdateCareersComplete] = useState(false);

  const [schools, setSchools] = useState([]);
  const [schoolSelected, setSchoolSelected] = useState(0);

  const { career } = props.careersReducer;
  const { user } = props.userReducer;


  const classes = useStyles();

  useEffect(() => {
    BackendConnection.getSchools().then((schools) => {
      if (schools && schools.length > 0) {
        console.log(career);
        setSchools(schools);
        setSchoolSelected(career.facultad_idfacultad);
        handleNameChange(career.namecarrera);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (updateCareersComplete) {
    props.getCareers();
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

  const validName = () => {
    const nameValidIsNoEmpty = !nameError && name.length > 0;
    if (!nameValidIsNoEmpty) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    }

    if (nameValidIsNoEmpty) {
      confirmCreation();
    }
  };

  const updateCareers = () => {
    BackendConnection.updateCareer(career.idcarrera, schoolSelected, name).then((response) => {
      console.log(`update career complete ${response}`);
      setOpenDialog(false);
      setUpdateCareersComplete(true);
    });
    let aux = new Date();
    let val = "idcarrera:" + career.idcarrera + ",facultad_idfacultad:" + career.facultad_idfacultad + ",namecarrera:" + career.namecarrera 
           + ",idcarrera:" + career.idcarrera + ",facultad_idfacultad:" + schoolSelected + ",namecarrera:" + name;
    BackendConnection.createUserslog(3, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
      console.log("ok updated");
    })
  };

  const handleChange = (event) => {
    setSchoolSelected(event.target.value);
  };

  const renderForm = () => {
    return (
      <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
        <Grid item style={{ textAlign: 'center' }}>
          <h2>{sUpdateCareer}</h2>
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
        messageText={sConfirmTheUpdate}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={updateCareers}
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
                {sUpdateCareer}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditUniversityCareers));
