import * as React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardItem from '../../components/CardItem';
import BackendConnection from '../../api/BackendConnection';
import Fab from '@material-ui/core/Fab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCarreras, getGruposBackend, getGrupoHorariosBackend } from '../../redux/actions/indexthunk.actions';

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },    
  }));

const {useState,useEffect} = React;

const AdditionalClassList=(props)=>{
    const classes = useStyles();
    const {user} = props.user;
    const {grupos, grupoHorarios} = props.grupoReducer;
    const {materias} = props.materiasReducer;
    const {careers:carreras} = props.carrerasReducer;
    const [addClasses,setAddClasses] = useState([]);
    const [arrToMap,setArrToMap] = useState([]);
  const fab = {
    color: 'primary',
    className: classes.fab,
    icon: <AddIcon />,
    label: 'Add',
  };
    useEffect(() => {
      props.getGrps();
      props.getGrpHorarios();       
    }, [])

    useEffect(() => {
      if(grupoHorarios.length>0 && grupos.length>0 && materias.length>0 && carreras.length>0){  
        BackendConnection.getAllAdditionalClass()
            .then((res)=>{                
              const userGrpHrs=grupoHorarios.filter((grpHor)=>{
                return grpHor.users_idusers==user.idusers
              })                    
              
              const userAddClass=res.filter((rep)=>userGrpHrs.some((g)=>g.idgrupohorarios==rep.grupohorarios_idgrupohorarios));
              
              const arr=armarArr(userAddClass,userGrpHrs);
              setArrToMap(arr);
              setAddClasses(userAddClass);                                  
            })
        }
    }, [grupoHorarios,grupos,materias,carreras])

  const armarArr=(classes,userGrpHrs)=>{
    let arr=[];
    classes.map((clas)=>{
      arr.push({
        idassistance:clas.assistance_idassistance,                  
        materia:obtMat(clas,userGrpHrs),
        carrera:obtCarr(clas,userGrpHrs),
        accepted:clas.accepted,
        timeclass:clas.timeclass,
        dateclass:clas.dateclass,
      })
    });
    return (arr);    
  };
  const obtMat=(clas,GrpHr)=>{  
      const g=GrpHr.find((g)=>clas.grupohorarios_idgrupohorarios==g.idgrupohorarios);
      const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
      const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
      return mat.namemateria;
    
  };
  const obtCarr=(clas,userGrpHrs)=>{
    const g=userGrpHrs.find((g)=>clas.grupohorarios_idgrupohorarios==g.idgrupohorarios);
    const grp=grupos.find((grp)=>g.grupo_idgrupo==grp.idgrupo)
    const mat= materias.find((m)=>grp.materia_idmateria==m.idmateria);
    const carr= carreras.find((ca)=>mat.carrera_idcarrera==ca.idcarrera)
    return carr.namecarrera;
  };

  const create=()=>{
    props.history.push('/account/registerAdditionalClass')
  };
  
  return(
      <div>
          <h1>Lista de Clases Adicionales</h1>  
          {arrToMap.length>0 &&
            arrToMap.map((arr)=><CardActionArea key={arr.idassistance} style={{margin:"20px"}}>            
            <CardItem
              text={"Carrera: "+arr.carrera+" Materia: "+arr.materia} 
              secondaryText={`Dia: ${new Date(arr.dateclass).toLocaleDateString()} Hora: ${arr.timeclass}`}
              tercerText={"Acceptado: "+arr.accepted}
              showIconRow={true}
            />
            </CardActionArea>)}
            <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={create}>
              {fab.icon}
          </Fab>
      </div>
    )
};

const mapStateToProps = (state) => {
    return {
      user: state.userReducer,
      users: state.usersReducer,
      grupoReducer: state.grupoReducer,
      materiasReducer: state.materiasReducer,
      carrerasReducer: state.careersReducer,
    };
  };
const mapDispatchToProps = (dispatch) => ({
    getGrps: () => dispatch(getGruposBackend()),
    getGrpHorarios: () => dispatch(getGrupoHorariosBackend()),
  });
  

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdditionalClassList));