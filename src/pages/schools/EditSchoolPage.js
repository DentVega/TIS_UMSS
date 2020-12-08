import React, { useState } from 'react';
import { useFullName } from '../../constants/formCustomHook/useForm';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSchools } from '../../redux/actions/indexthunk.actions';
import { changeSchool } from '../../redux/actions/index.actions';
import {
  sAreYouSureYourWantCancel, sCancel,
  sConfirm,
  sConfirmTheCreation,
  sName,
  sTheNameCannotBeEmpty, sUpdateSchool
} from '../../constants/strings';
import { Button, Grid, TextField } from '@material-ui/core';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import BackendConnection from '../../api/BackendConnection';

function EditSchoolPage(props) {
  const [name, handleNameChange, nameError, setNameError, nameMesasge, setNameErrorMessage] = useFullName();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [updateSchoolComplete, setUpdateSchoolComplete] = useState(false);

  const [schoolSelected, setSchoolSelected] = useState(null);
  const [loadCurrentSchool, setLoadCurrentSchool] = useState(false);

  const { school } = props.schoolReducer;
  if (school!= null && !loadCurrentSchool) {
    setSchoolSelected(school);
    handleNameChange(school.namefacultad);
    setLoadCurrentSchool(true);
  }

  if (updateSchoolComplete) {
    props.getSchools();
    props.changeSchool(null);
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

  const validName = () => {
    const nameValidIsNoEmpty = !nameError && name.length > 0;
    if (!nameValidIsNoEmpty) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    }

    if (nameValidIsNoEmpty) {
      confirmUpdate();
    }
  };

  const updateSchool = () => {
    BackendConnection.updateSchools(schoolSelected.idfacultad, name)
      .then(() => {
        setOpenDialog(false);
        setUpdateSchoolComplete(true);
      });
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
        handleAccept={updateSchool}
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
    app: state.app,
    schoolReducer: state.schoolReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  changeSchool: (school) => dispatch(changeSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditSchoolPage));