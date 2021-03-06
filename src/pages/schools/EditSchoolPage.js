import React, { useState } from 'react';
import { useDescription, useFullName } from '../../constants/formCustomHook/useForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSchools } from '../../redux/actions/indexthunk.actions';
import {
  sAreYouSureYourWantCancel, sCancel,
  sConfirm,
  sConfirmTheCreation,
  sName,
  sTheNameCannotBeEmpty, sUpdateSchool,
  sSchoolAlreadySaved, sDescription,
  sTheDescriptionCannotBeEmpty,
} from '../../constants/strings';
import { Button, Grid, TextField } from '@material-ui/core';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import BackendConnection from '../../api/BackendConnection';

function EditSchoolPage(props) {
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullName();
  const [description, handleDescriptionChange, descriptionError, setDescriptionError, descriptionMesasge, setDescriptionErrorMessage] = useDescription();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [updateSchoolComplete, setUpdateSchoolComplete] = useState(false);

  const [schoolSelected, setSchoolSelected] = useState(null);
  const [loadCurrentSchool, setLoadCurrentSchool] = useState(false);
  const { user } = props.userReducer;
  const { school, schools } = props.schoolReducer;

  if (school != null && !loadCurrentSchool) {
    setSchoolSelected(school);
    handleNameChange(school.namefacultad);
    handleDescriptionChange(school.descripcion);
    setLoadCurrentSchool(true);
  }

  if (updateSchoolComplete) {
    props.getSchools();
    props.history.goBack();
  }

  const cancel = () => {
    props.history.goBack();
  };

  const confirmUpdate = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const getSelected = () => {
    if(schools.length > 0){
      return schools.filter((it) => it.namefacultad == name).length;
    }
   }

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
      let val = getSelected();
      if(val > 0){
        setNameErrorMessage(sSchoolAlreadySaved);
        setNameError(true);
      }else{
        confirmUpdate();
      } 
    }
  };

  const updateSchool = () => {
    if (!updateSchoolComplete) {
      BackendConnection.updateSchools(schoolSelected.idfacultad, name, description)
        .then(() => {
          let val = 'idfacultad:' + schoolSelected.idfacultad + ',namefacultad:' + schoolSelected.namefacultad + ',idfacultad:' + schoolSelected.idfacultad + ',namefacultad:' + name;
          let aux = new Date();
          BackendConnection.createUserslog(3, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
            console.log('ok updated');
            setOpenDialog(false);
            setUpdateSchoolComplete(true);
          });
        });
    }
  };

  const renderForm = () => {
    return (
      <Grid item style={{ width: '100vh', borderRadius: '40px' }}>
        <Grid container justify="center" direction="column" spacing={4}>
          <Grid item style={{ textAlign: 'center' }}>
            <h2>{sUpdateSchool}</h2>
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
        handleAccept={() => updateSchool()}
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
                {sUpdateSchool}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSchoolPage));
