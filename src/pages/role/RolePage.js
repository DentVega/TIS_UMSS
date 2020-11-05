import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button} from '@material-ui/core';
// import { enumMenuDrawer } from '../../constants/mockData';
// import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router-dom';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import { changeRole } from '../../redux/actions/index.actions';
import { getRoles } from '../../redux/actions/indexthunk.actions';
import { getRoleFuncs } from '../../redux/actions/indexthunk.actions';
// import { colorMain } from '../../constants/colors';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';
import {
  sAreYouSureYourWantCancel,
  sConfirm,
  sConfirmTheCreationRol,
  sConfirmTheUpdateOfRol, sCreateRol, sEditRol, sNameTheRol,
  sTheNameCannotBeEmpty
} from '../../constants/strings';
import { useNameRol } from '../../constants/formCustomHook/useForm';
import {ListAccess} from './ListAccess';
function RolePage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  const [createRoleComplete, setCreateRoleComplete] = useState(false);
  const [updateRoleComplete, setUpdateRoleComplete] = useState(false);
  const [idRole, setIdRole] = useState(null);
  const [loadCurrentRole, setLoadCurrentRole] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [nameRole, setNameRole, nameError, setNameError, nameMessage, setNameErrorMessage] = useNameRol();
  const [prevFunc,setPrevFunc]=useState(null);
  const [state, setState] = useState([
    {id:1,checked:false},
    {id:2,checked:false},
    {id:3,checked:false},
    {id:4,checked:false},
    {id:5,checked:false},
    {id:6,checked:false},
    {id:7,checked:false}
  ]);
  const { role } = props.rolesReducer;
  if (role != null && !loadCurrentRole) {
    setNameRole(role.rolename);
    setIdRole(role.idroles);
    setLoadCurrentRole(true);
  }
  useEffect(()=>{     
    BackendConnection.getRoleFuncs().then(res=>{
      let arr=[...state]; 
      setPrevFunc(res);
      res.forEach(element=>{
        if(element.roles_idroles===idRole){
          let newObj={...arr[(element.funcion_idfuncion)-1],checked:true};
          arr[element.funcion_idfuncion-1]=newObj;          
        };
      })
    setState(arr);
    });

  },[])
  const cancelCreateRole = () => {
    props.changeRole(null);
    props.history.goBack();
  };

  const createRole = () => {
    if (nameRole.length === 0) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    } else {

      BackendConnection.createRole(nameRole)
      .then(() => {
        setCreateRoleComplete(true);
        BackendConnection.getRoles()
        .then((res) =>{
          const id=res.find(c=>c.rolename===nameRole).idroles;          
          for(let i=0;i<state.length;i++){
            if(state[i].checked)BackendConnection.roleFunction(id,state[i].id);            
          }
        })
        .catch((err) => console.warn(err))
      });     
    }
  };

  const updateRole = () => {
    if (nameRole.length === 0) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    } else {          
      BackendConnection.updateRole(idRole, nameRole)
      .then(() => {
        setUpdateRoleComplete(true);
        prevFunc.forEach(element=>{
          if(element.roles_idroles===idRole){
          BackendConnection.deleteRoleFunc(idRole,element.funcion_idfuncion);
          }
        })
          for(let i=0;i<state.length;i++){
            if(state[i].checked){
              BackendConnection.roleFunction(idRole,state[i].id);
            }
          }
      });
    }
  };

  if (createRoleComplete || updateRoleComplete) {
    props.getRoles();
    props.history.goBack();
  }

  // const menuAdmin = [
  //   enumMenuDrawer.home,
  //   enumMenuDrawer.campus,
  //   enumMenuDrawer.school,
  //   enumMenuDrawer.subjects,
  //   enumMenuDrawer.schedule,
  //   enumMenuDrawer.reports,
  //   enumMenuDrawer.groups,
  //   enumMenuDrawer.administration,
  //   enumMenuDrawer.account,
  // ];

  const confirmCreation = () => {
    const nameIsNoEmpty = !nameError && nameRole.length > 0;
    if (!nameIsNoEmpty) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    } else {
      setOpenDialog(true);
    }
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>   
      <CustomAlertDialog
        title={sConfirm}
        messageText={idRole === null ? sConfirmTheCreationRol : sConfirmTheUpdateOfRol}
        open={openDialog}
        handleClose={closeDialog}
        handleAccept={idRole === null ? createRole : updateRole}
      />
      <CustomAlertDialog
        title={sConfirm}
        messageText={sAreYouSureYourWantCancel}
        open={openDialogCancel}
        handleClose={() => setOpenDialogCancel(false)}
        handleAccept={cancelCreateRole}
      />

      <h1>Role</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id={'name-rol'}
            label={sNameTheRol}
            value={nameRole}
            onChange={({ target }) => setNameRole(target.value)}
            error={nameError}
            helperText={nameMessage}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListAccess setState={setState} state={state} />
          {/*{renderListAccess()}*/}
        </Grid>
        <Grid item xs={12}>
          <div>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 10 }}
              onClick={() => setOpenDialogCancel(true)}>
              Cancel
            </Button>

            <Button variant="contained" color="primary" style={{ margin: 10 }} onClick={confirmCreation}>
              {idRole === null ? sCreateRol : sEditRol}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    rolesReducer: state.rolesReducer,
    userReducer:state.userReducer,
    roleFuncs:state.roleFuncsReducer
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeRole: (rol) => dispatch(changeRole(rol)),
  getRoles: () => dispatch(getRoles()),
  getRoleFunc: () =>dispatch(getRoleFuncs())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RolePage));