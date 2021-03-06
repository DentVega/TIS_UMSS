import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BackendConnection from '../../api/BackendConnection';
import { connect } from 'react-redux';
import { changeRole } from '../../redux/actions/index.actions';
import { getRoleFuncs, getRoles } from '../../redux/actions/indexthunk.actions';
import CustomAlertDialog from '../../components/dialogs/CustomAlertDialog';

import {
  sAreYouSureYourWantCancel,
  sConfirm,
  sConfirmTheCreationRol,
  sConfirmTheUpdateOfRol,
  sCreateRol,
  sEditRol,
  sNameTheRol,
  sTheNameCannotBeEmpty,
  sRoleAlreadySaved,
} from '../../constants/strings';
import { useNameRol } from '../../constants/formCustomHook/useForm';
import { ListAccess } from '../../components/ListAccess';

function RolePage(props) {
  const [createRoleComplete, setCreateRoleComplete] = useState(false);
  const [updateRoleComplete, setUpdateRoleComplete] = useState(false);
  const [idRole, setIdRole] = useState(null);
  const [loadCurrentRole, setLoadCurrentRole] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCancel, setOpenDialogCancel] = useState(false);
  const [nameRole, setNameRole, nameError, setNameError, nameMessage, setNameErrorMessage] = useNameRol();
  const [state, setState] = useState([
    {id:1,checked:false},
    {id:2,checked:false},
    {id:3,checked:false},
    {id:4,checked:false},
    {id:5,checked:false},
    {id:6,checked:false},
    {id:7,checked:false},
    {id:8,checked:false},
    {id:9,checked:false},
    {id:10,checked:false},
  ]);
  const { role, roles } = props.rolesReducer;
  const { roleFuncs } = props.roleFuncs;
  const [rolFun,setRolFun]=useState([]);
    if (role != null && !loadCurrentRole) {
      setNameRole(role.rolename);
      setIdRole(role.idroles);
      setLoadCurrentRole(true);
    }
  useEffect(()=>{ 
    if(props.history.location.pathname!=="/newrole"){
      let arr=[...state]; 
      let roleFunction=[];
      if(roleFuncs!==null){       
        roleFuncs.forEach(element=>{
          if(element.roles_idroles===idRole){
            roleFunction.push(element);
            let newObj={...arr[(element.funcion_idfuncion)-1],checked:true};
            arr[element.funcion_idfuncion-1]=newObj;          
          };
        })
      }
     
    setRolFun(roleFunction);
    setState(arr);
    }
    if(props.history.location.pathname==="/newrole"){
      setIdRole(null);
      setNameRole("");
    }
  },[])

  const cancelCreateRole = () => {
    props.changeRole(null);
    props.history.goBack();
  };

  const getSelected = () => {
    if(roles.length > 0){
      return roles.filter((it) => it.rolename == nameRole).length;
    }
   }

  const createRole = () => {
    let cont=0;
      if (nameRole.length === 0) {
        setNameErrorMessage(sTheNameCannotBeEmpty);
        setNameError(true);
      } else {
          BackendConnection.createRole(nameRole)
          .then((res) => {
              setCreateRoleComplete(true);        
              for(let i=0;i<state.length;i++){
                if(state[i].checked){
                  setTimeout(() => {
                  BackendConnection.roleFunction(res.data.body.res[0].idroles,state[i].id);  
                  },cont*200)
              }  
              cont++;        
            }
              setTimeout(() => {
              props.getRoleFunc();
              },cont*200)        
          }).catch((err) => console.warn(err))
      }
    
  };

  const updateRole = () => {
    let cont=0;
    if (nameRole.length === 0) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    } else {         
      BackendConnection.updateRole(idRole, nameRole).then(()=>{
      rolFun.forEach((element)=>{ 
        setTimeout(()=>{  
          BackendConnection.deleteRoleFunc(idRole,element.funcion_idfuncion);
        },cont*700)
        cont++;  
            
      }) 
    }).then(()=> {    
      for(let i=0;i<=state.length-1;i++){
        if(state[i].checked){
          setTimeout(()=>{  
          BackendConnection.roleFunction(idRole,state[i].id);  
        },cont*700)
        } 
        cont++;
      }
    })
    setTimeout(()=>{  
     props.getRoleFunc();
    },9*1400)
    setUpdateRoleComplete(true);
    
    } 
  };
 
  if (createRoleComplete || updateRoleComplete) {
    props.getRoles();
    props.history.goBack();
  }

  const confirmCreation = () => {
    const nameIsNoEmpty = !nameError && nameRole.length > 0;
    if (!nameIsNoEmpty) {
      setNameErrorMessage(sTheNameCannotBeEmpty);
      setNameError(true);
    } else {
      if(props.history.location.pathname==="/newrole"){
        let val = getSelected();
        if(val > 0){
          setNameErrorMessage(sRoleAlreadySaved);
          setNameError(true);
        }else{
          setOpenDialog(true);
        }
      }else{
        setOpenDialog(true);
      }
      
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
    userReducer: state.userReducer,
    roleFuncs: state.roleFuncsReducer
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeRole: (rol) => dispatch(changeRole(rol)),
  getRoles: () => dispatch(getRoles()),
  getRoleFunc: () =>dispatch(getRoleFuncs())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RolePage));
