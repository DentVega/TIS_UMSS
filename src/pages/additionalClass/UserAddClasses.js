import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras, getGruposBackend } from '../../redux/actions/indexthunk.actions';
import BackendConnection from '../../api/BackendConnection';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardItem from '../../components/CardItem';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Button, Container } from '@material-ui/core';

const { useState, useEffect } = React;

const useStyles = makeStyles((theme) => ({
  root: {      
    width: "90%", 
    padding:10,     
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width:900,
    height:700,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UserAddClasses = (props) => {
  const classes=useStyles();
  const { id } = props.match.params;
  const { users } = props.users;
  const { grupos, grupoHorarios } = props.grupoReducer;
  const { materias } = props.materiasReducer;
  const { careers: carreras, loading: lCarr } = props.carrerasReducer;
  const [ userClasses,setUserClasses ] = useState([]);
  const [ arrToMap,setArrToMap ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ idClassSelected,setIdClassSelected] = useState(null);
  const [ falta,setFalta ]= useState(null);

  useEffect(() => {
    props.getGrps();
    lCarr && props.getCarreras();
    datas();
  }, []);

  const datas=()=>{
    BackendConnection.getAllAdditionalClass()
      .then((res)=>{
        const grpH = grupoHorarios.filter((grpHor)=>grpHor.users_idusers==id);
        const rep=res.filter((rep)=>grpH.some((g)=>g.idgrupohorarios==rep.grupohorarios_idgrupohorarios));
        setUserClasses(rep);
      });         
  };

  const userName = () => {
    const user = users.find((user) => id == user.idusers);
    return `${user.firstname} ${user.lastname}`;
  };

  const armarArr=(grpH,userClasses)=>{
    let arr=[];
    userClasses.map((re)=>{
      arr.push({
        idadditionalClass:re.idadditionalclass,
        idgrupoHorario:re.grupohorarios_idgrupohorarios,
        accepted:re.accepted,
        timeClass:re.timeclass,
        dateClass:re.dateclass,
        idfalta:re.falta_idfalta,
        materia:obtMateria(re,grpH),
        carrera:obtCarrera(re,grpH),
      })
    });
    return (arr);    
  };

  useEffect(()=>{
    if(grupos.length>0 && users.length>0 && materias.length>0 && carreras.length>0 && grupoHorarios.length>0){
      const a=armarArr(grupoHorarios,userClasses);
      setArrToMap(a); 
    };
   },[userClasses,grupos,users,materias,carreras,grupoHorarios]);

  const obtCarrera=(rep,grpH)=>{    
    const g=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    const carr= carreras.find((ca)=>mat.carrera_idcarrera==ca.idcarrera)
    return carr.namecarrera;
  };
  const obtMateria=(rep,grpH)=>{
    const g=grpH.find((g)=>rep.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    return mat.namemateria;
  };

  const acceptClass=()=>{
    BackendConnection.aceptarClaseAdicional(idClassSelected.idadditionalClass,idClassSelected.idgrupoHorario,idClassSelected.idfalta,idClassSelected.timeClass,idClassSelected.dateClass)
      .then(res=>{
        BackendConnection.getAllAdditionalClass()
        .then((res)=>{
          const grpH = grupoHorarios.filter((grpHor)=>grpHor.users_idusers==id);
          const rep=res.filter((rep)=>grpH.some((g)=>g.idgrupohorarios==rep.grupohorarios_idgrupohorarios));
          setUserClasses(rep);
          setIdClassSelected(null)
          setFalta(null);
          setOpen(false);
        });   
      });
  };

  const renderReports=()=>{
    return arrToMap.map((classe)=><div key={classe.idadditionalClass} className={classes.root}>
      <CardActionArea>
        <CardItem      
          text={"Carrera: "+classe.carrera} 
          secondaryText={"Materia: "+classe.materia}
          tercerText={"Acceptado: "+classe.accepted.toLowerCase()}
          showEditIcon={false}
          showIconRow={true}
          showDeleteIcon={false}
          onClick={()=>handleOpen(classe)}
        />
      </CardActionArea>
    </div>)    
  };

  const handleClose = () => {
    setIdClassSelected(null)
    setFalta(null);
    setOpen(false);    
  };
  
  const handleOpen = (idClass) => {
    setIdClassSelected(idClass);
    setOpen(true);
    BackendConnection.getAbsenceById(idClass.idfalta)
      .then(res=>{
        setFalta(res);        
      })       
  };
  return (
    <>
      <h1>Clases Adicionales del usuario: {userName()} </h1>
      {arrToMap.length>0 ? renderReports() : <h2>...Cargando</h2>}      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {idClassSelected!==null && <h2>Id de la Clase Adicional: {idClassSelected.idadditionalClass}</h2>}
            {idClassSelected!==null && <h2>Hora planteada de la clase: {idClassSelected.timeClass}</h2>}
            {idClassSelected!==null && <h2>Fecha planteda de la clase: {new Date(idClassSelected.dateClass).toLocaleDateString()}</h2>}            
           
            {falta!==null ? 
            <Container align="center">
              <iframe
                title="iframe"
                data="application/pdf"
                src={falta[0].archivo}
                style={{ height: '400px', width: '700px' }}
              />
            </Container>:<h2>No hay una archivo de la falta</h2>}
            <Button 
              variant="contained" 
              color="primary" 
              style={{margin:30,float:"right"}} 
              type="submit" 
              onClick={acceptClass}
            >
              Aceptar Clase
            </Button>          
          </div>
        </Fade>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer,
    grupoReducer: state.grupoReducer,
    materiasReducer: state.materiasReducer,
    carrerasReducer: state.careersReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCarreras: () => dispatch(getCarreras()),
  getGrps: () => dispatch(getGruposBackend()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserAddClasses));
