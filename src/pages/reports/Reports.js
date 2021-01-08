import * as React from 'react';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { routes } from '../../router/RoutesConstants';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { connect } from 'react-redux';
import { getCarreras, getSchools,getMateriasBackend,getGrupoHorariosBackend,getGruposBackend } from '../../redux/actions/indexthunk.actions';

const useStyles = makeStyles({
    root: {
      width: 600,
      margin:20
    },
})

const {useEffect}=React;
const Reports = (props) => {
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const{loading:ldgSch}=props.schools;
  const {loading:lMat} = props.materiasReducer;
  const {loading:lcarr} = props.careersReducer;
  const {loadingGrupos:lgrps,loadingGrupoHorarios:lgrphor}=props.gruposReducer;
  const redirect=()=>props.history.push(routes.absencesReports);
  const redirectLogs=()=>props.history.push(routes.usersList);
  const redirectAddClasses=()=>props.history.push(routes.userAddClasses);
  
  useEffect(_=>{
    ldgSch && props.getSchools();
    lMat && props.getMaterias();
    lgrphor && props.getGrupoHorarios()
    setTimeout(()=>{
      lcarr && props.getCarreras();
      lgrps && props.getGrupos();
    },1800)
  },[]);

  return(
    <div>
      <h1>Registros Varios</h1>
        <Card className={classes.root}>
          <CardActionArea>
            <CardItem     
              onClick={redirect}     
              text={"Registro faltas"}
              showIconRow={true}
              showEditIcon={false}
              showDeleteIcon={false}
            />
          </CardActionArea>
        </Card>      
        <Card className={classes.root}>                                                       
          <CardActionArea>
            <CardItem    
              onClick={redirectLogs}
              text={"Registro de Avance Semanal/Mensual"}
              showIconRow={true}
              showEditIcon={false}
              showDeleteIcon={false}
            />
          </CardActionArea>
        </Card>
        <Card className={classes.root}>                                                       
          <CardActionArea>
            <CardItem    
              onClick={redirectAddClasses}
              text={"Registro de Clases Adicionales"}
              showIconRow={true}
              showEditIcon={false}
              showDeleteIcon={false}
            />
          </CardActionArea>
        </Card>
    </div>
  );
}; 
const mapStateToProps = (state)=>{
  return{
    schools:state.schoolReducer,
    materiasReducer:state.materiasReducer,
    careersReducer:state.careersReducer,
    gruposReducer:state.grupoReducer
  };
};
const mapDispatchToProps = (dispatch) => ({
  getSchools: () => dispatch(getSchools()),  
  getMaterias:()=>dispatch(getMateriasBackend()),
  getCarreras:()=>dispatch(getCarreras()),
  getGrupoHorarios:()=>dispatch(getGrupoHorariosBackend()),
  getGrupos:()=>dispatch(getGruposBackend()),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Reports));
    