import React from 'react';
import { withRouter } from 'react-router-dom';
import CardItem from '../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    root: {
      width: 700,
      margin:20
    },
  })

function AccountPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const redirectFaltas=()=>{
    props.history.push('/account/absences')
  }
  const redirectRegisterProgress=()=>{
    props.history.push('/account/registerProgress')
  }
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
    </div>
  );
}

export default withRouter(AccountPage);
