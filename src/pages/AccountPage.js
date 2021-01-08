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
    props.history.push(routes.userAbsences)
  };
  const redirectRegisterProgress=()=>{
    props.history.push(routes.registerProgress)
  };
  const redirectAdditionalClass=()=>{
    props.history.push(routes.additionalClassList);
  };
  return (
    <div >
      <h1>FeedBack</h1>
      {/*Informacion de la cuenta*/}
      <Card 
      className={classes.root }
      >
        <CardActionArea>
          <CardItem          
            onClick={redirectFaltas}
            text={"Registre su Falta"}
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
            text={"Registre su avanze semanal"}
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
            text={"Registre su clase adicional"}
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
