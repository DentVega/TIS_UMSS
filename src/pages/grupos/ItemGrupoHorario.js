import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  content: {
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
}));

function ItemGrupoHorario(props) {
  const { grupoHorario, horarios, deleteClick } = props;
  const classes = useStyles();

  useEffect(() => {
  }, []);

  const renderHorario = () => {
    let currenthorario = null;
    horarios.forEach((horario) => {
      if (grupoHorario.horario_idhorario === horario.idhorario) {
        currenthorario = horario;
      }
    });
    if (currenthorario) {
      return <div>
        <h5>Inicio: {currenthorario.horaini} - Fin {currenthorario.horafin}</h5>
      </div>;
    } else {
      return <div/>;
    }
  };

  return (
    <Card className={classes.content}>
      <Grid container>
        <div>
          <h4>Dia: {grupoHorario.dia}</h4>
          {renderHorario()}
        </div>
        <IconButton style={{ paddingLeft: 20, paddingRight: 20 }} onClick={() => deleteClick(grupoHorario.idgrupohorarios)}>
          <DeleteIcon/>
        </IconButton>
      </Grid>
    </Card>
  );
}

export default ItemGrupoHorario;
