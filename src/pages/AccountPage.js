import React,{useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import CardItem from '../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routes } from '../router/RoutesConstants';
import {  getCarreras,getMateriasBackend } from '../redux/actions/indexthunk.actions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
      width: 700,
      margin:20
    },
  })

function AccountPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  useEffect(() => {
    props.getMaterias();
    props.getCarreras();
  }, [])

  const redirectFaltas=()=>{
    props.history.push('/account/absences')
  };
  const redirectRegisterProgress=()=>{
    props.history.push('/account/registerProgress')
  };
  const redirectAdditionalClass=()=>{
    props.history.push(`${routes.additionalClassList}`);
  };
  return (
    <div >
      <h1>Cuenta del usuario</h1>
      {/*Informacion de la cuenta*/}
      <Card 
      className={classes.root }
      >
        <CardActionArea>
          <CardItem          
            onClick={redirectFaltas}
            text={"Faltas"}
            showIconRow={true}
            showEditIcon={false}
            showDeleteIcon={false}
          />
        </CardActionArea>
      </Card>
      
      <Card 
      className={classes.root }
      >
        <CardActionArea>
          <CardItem          
            onClick={redirectRegisterProgress}
            text={"Registro de Avanze Semanal"}
            showIconRow={true}
            showEditIcon={false}
            showDeleteIcon={false}
          />
        </CardActionArea>
      </Card>
        <Card  className={classes.root }>
        <CardActionArea>
          <CardItem          
            onClick={redirectAdditionalClass}
            text={"Registro de Clase Adicional"}
            showIconRow={true}
            showEditIcon={false}
            showDeleteIcon={false}
          />
        </CardActionArea>
      </Card>
    </div>
  );
}
const mapStateToProps=(state)=>{
  return{
  }
};
const mapDispatchToProps = (dispatch) => ({
  getCarreras: () => dispatch(getCarreras()),
  getMaterias:()=>dispatch(getMateriasBackend()),
});

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AccountPage));
