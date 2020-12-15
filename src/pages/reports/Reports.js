import * as React from 'react';
import CardItem from '../../components/CardItem';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { routes } from '../../router/RoutesConstants';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    root: {
      width: 600,
      margin:20
    },
})

const Reports = (props) => {
  sessionStorage.setItem("path",props.history.location.pathname);
  const classes = useStyles();
  const redirect=()=>props.history.push(routes.absencesReports);
  const redirectLogs=()=>props.history.push(routes.usersList);
  const redirectAddClasses=()=>props.history.push(routes.userAddClasses)
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

export default withRouter(Reports);
    