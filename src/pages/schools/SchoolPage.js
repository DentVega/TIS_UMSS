import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSchools } from '../../redux/actions/indexthunk.actions';
import { changeSchool } from '../../redux/actions/index.actions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import AddIcon from '@material-ui/icons/Add';
import CardItem from '../../components/CardItem';
import { sConfirm, sSchools } from '../../constants/strings';
import Fab from '@material-ui/core/Fab';
import { routes } from '../../router/RoutesConstants';
import BackendConnection from '../../api/BackendConnection';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

function SchoolPage(props) {
  const { loading, schools } = props.schoolReducer;
  const [schoolSelected, setSchoolSelected] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
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

  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };

  const renderSchool = () => {
    return (
      <div>
        {schools.map((school) => {
          return (
            <div key={school.idfacultad}>
              <CardItem
                text={school.namefacultad}
                width={500}
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
      <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={newSchool}>
        {fab.icon}
      </Fab>
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
