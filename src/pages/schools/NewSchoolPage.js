import React, { useEffect, useState } from 'react';
import { useDescription, useFullName } from '../../constants/formCustomHook/useForm';
import { Button, Grid, TextField } from '@material-ui/core';
import {
  sAreYouSureYourWantCancel,
  sCancel,
  sConfirm,
  sConfirmTheCreation,
  sCreateSchool,
  sName,
  sTheNameCannotBeEmpty,
  sSchoolAlreadySaved, sDescription, sTheDescriptionCannotBeEmpty,
} from '../../constants/strings';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import { getSchools } from '../../redux/actions/indexthunk.actions';
import { changeSchool } from '../../redux/actions/index.actions';
import BackendConnection from '../../api/BackendConnection';

function NewSchoolPage(props) {
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullName();
  const [description, handleDescriptionChange, descriptionError, setDescriptionError, descriptionMesasge, setDescriptionErrorMessage] = useDescription();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [createSchoolComplete, setCreateSchoolComplete] = useState(false);
  const { user } = props.userReducer;
  const { schools } = props.schoolReducer;

  const getSelected = () => {
    if (schools.length > 0) {
      return schools.filter((it) => it.namefacultad == name).length;
    }
  };

  if (createSchoolComplete) {
    props.getSchools();
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

    const descriptionIsNoEmpty = !descriptionError && description.length > 0;
    if (!descriptionIsNoEmpty) {
      setDescriptionErrorMessage(sTheDescriptionCannotBeEmpty);
      setDescriptionError(true);
    }

    if (nameValidIsNoEmpty && descriptionIsNoEmpty) {
      let val = getSelected(0);
      if (val > 0) {
        setNameErrorMessage(sSchoolAlreadySaved);
        setNameError(true);
      } else {
        confirmCreation();
      }
    }
  };

  const registerSchool = () => {
    let id = 0;
    BackendConnection.createSchools(name, description).then((response) => {
      setOpenDialog(false);
      setCreateSchoolComplete(true);
      id = response.body.res[0].idfacultad;
      let aux = new Date();
      let val = 'idfacultad:' + id + ',namefacultad:' + name;
      BackendConnection.createUserslog(2, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
        console.log('ok');
      });
    });

  };

  const renderForm = () => {
    return (
      <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
        <Grid container justify="center" direction="column" spacing={4}>
          <Grid item style={{ textAlign: 'center' }}>
            <h2>{sCreateSchool}</h2>
          </Grid>
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
        handleAccept={registerSchool}
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
                {sCreateSchool}
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
    app: state.app,
    schoolReducer: state.schoolReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  changeSchool: (school) => dispatch(changeSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewSchoolPage));
