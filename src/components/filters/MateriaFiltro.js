import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BackendConnection from '../../api/BackendConnection';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { changeMateriaFiltro } from '../../redux/actions/index.actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function MateriaFiltro(props) {
  const todos = {
    idmateria: 0,
    namemateria: 'Todos',
  };

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [materias, setMaterias] = useState([]);

  const { materiaSeleccionada } = props.filtersReducer;

  useEffect(() => {
    BackendConnection.getMaterias().then((materias) => {
      const materiasAux = materias;
      materiasAux.push(todos);

      setMaterias(materiasAux);
      setLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    props.changeMateriaFiltro(event.target.value);
  };

  return (
    <div>
      {!loading && (
        <FormControl className={classes.formControl}>
          <InputLabel id="materia-selecionada">Materia</InputLabel>
          <Select
            labelId="materia-selecionada"
            id="materia-selecionada-select"
            value={materiaSeleccionada}
            onChange={handleChange}>
            {materias.map((materia) => {
              return (
                <MenuItem key={materia.idmateria} value={materia.idmateria}>
                  {materia.namemateria}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filtersReducer: state.filtersReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeMateriaFiltro: (materiaId) => dispatch(changeMateriaFiltro(materiaId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MateriaFiltro);
