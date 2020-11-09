import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import FacultadFiltro from './FacultadFiltro';
import CarreraFiltro from './CarreraFiltro';
import { Grid } from '@material-ui/core';
import MateriaFiltro from './MateriaFiltro';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  container: {
    marginBottom: 20,
    padding: 10,
  },
}));

function ContainerFilter(props) {
  const { showFFacultad, showFCarrera, showFMateria } = props;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Grid container direction={'row'}>
        {showFFacultad && <FacultadFiltro/>}
        {showFCarrera && <CarreraFiltro/>}
        {showFMateria && <MateriaFiltro/>}
      </Grid>
    </Card>
  );
}

ContainerFilter.propTypes = {
  showFFacultad: PropTypes.bool,
  showFCarrera: PropTypes.bool,
  showFMateria: PropTypes.bool,
};

export default ContainerFilter;
