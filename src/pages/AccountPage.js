import React from 'react';
import { withRouter } from 'react-router-dom';
import CardItem from '../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
const useStyles = makeStyles({
    root: {
      width: 400,
    },
  })

function AccountPage(props) {
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const redirectFaltas=()=>{
    props.history.push('/account/absences')
  }
  return (
    <div>
      <h1>Cuenta del usuario</h1>
      {/*Informacion de la cuenta*/}
      <Card 
      className={classes.root }
      >
        <CardActionArea>
          <CardItem          
            onClick={redirectFaltas}
            text={"Faltas"}
            
            showEditIcon={false}
            showDeleteIcon={false}
          />
        </CardActionArea>
      </Card>
    </div>
  );
}

export default withRouter(AccountPage);
