import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BackendConnection from '../../api/BackendConnection';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { changeCarreraFiltro } from '../../redux/actions/index.actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CarreraFiltro(props) {
  const todos = {
    idcarrera: 0,
    namecarrera: 'Todos',
  };

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [carerras, setCarerras] = useState([]);

  const { carreraSeleccionada } = props.filtersReducer;

  useEffect(() => {
    BackendConnection.getCarreras().then((carreras) => {
      const carrerasAux = carreras;
      carrerasAux.push(todos);

      setCarerras(carrerasAux);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    props.changeCarreraFiltro(event.target.value);
  };

  return (
    <div>
      {!loading && (
        <FormControl className={classes.formControl}>
          <InputLabel id="carrera-selecionada">Carrera</InputLabel>
          <Select
            labelId="carrera-selecionada"
            id="carrera-selecionada-select"
            value={carreraSeleccionada}
            onChange={handleChange}>
            {carerras.map((carrera) => {
              return (
                <MenuItem key={carrera.idcarrera} value={carrera.idcarrera}>
                  {carrera.namecarrera}
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
  changeCarreraFiltro: (materiaId) => dispatch(changeCarreraFiltro(materiaId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarreraFiltro);
