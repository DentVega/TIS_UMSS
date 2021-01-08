import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSchools } from '../../redux/actions/indexthunk.actions';
import { changeSchool } from '../../redux/actions/index.actions';
import CardItem from '../../components/CardItem';
import { sConfirm, sSchools } from '../../constants/strings';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import FloatingButton from '../../components/FloatingButton';

function SchoolPage(props) {
  const { loading, schools } = props.schoolReducer;
  const [schoolSelected, setSchoolSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = props.userReducer;

  useEffect(() => {
    if (loading) {
      props.getSchools();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmDelete = (school) => {
    setOpenDialog(true);
    setSchoolSelected(school);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setSchoolSelected(null);
  };

  const newSchool = () => {
    props.changeSchool(null);
    props.history.push(routes.registerSchool);
  };

  const updateSchool = (school) => {
    props.changeSchool(school);
    props.history.push(`${routes.school}/${school.idfacultad}`);
  };

  const deleteSchool = () => {
    BackendConnection.deleteSchools(schoolSelected.idfacultad).then(() => {
      props.getSchools();
      setOpenDialog(false);
    });
    let aux = new Date();
    let val = "idfacultad:" + schoolSelected.idfacultad + ",namefacultad:" + schoolSelected.namefacultad;
    BackendConnection.createUserslog(1, user.idusers, aux.toLocaleTimeString(), aux.toLocaleDateString(), val, 0).then(() => {
      console.log("ok deleted");
    })
  };

  const renderSchool = () => {
    console.log('facultades', schools)
    return (
      <div>
        {schools.map((school) => {
          return (
            <div key={school.idfacultad} >
              <CardItem
                text={`Nombre: ${school.namefacultad}`}
                secondaryText={`Descripcion: ${school.descripcion}`}
                width={"120vh"}
                showEditIcon={true}
                showDeleteIcon={true}
                deleteClick={() => confirmDelete(school)}
                editClick={() => updateSchool(school)}
              />
              <div style={{ height: 20 }} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <CustomAlertDialog
        title={sConfirm}
        messageText={'Seguro que desea eliminar esta Facultad'}
        open={openDialog}
        handleClose={cancelDelete}
        handleAccept={deleteSchool}
      />
      <h1>{sSchools}</h1>
      {schools.length > 0 ? renderSchool() : <div />}
      {loading && <h3>Cargando...</h3>}
      <FloatingButton onClick={newSchool}/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    userReducer: state.userReducer,
    schoolReducer: state.schoolReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),
  changeSchool: (school) => dispatch(changeSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SchoolPage));
