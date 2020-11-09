import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import BackendConnection from '../../api/BackendConnection';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { changeFacultadFiltro, changeSchools } from '../../redux/actions/index.actions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function FacultadFiltro(props) {
  const todos = {
    idfacultad: 0,
    namefacultad: 'Todos',
  };

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [facultades, setFacultades] = useState([]);

  const { facultadSeleccionada } = props.filtersReducer;

  useEffect(() => {
    BackendConnection.getSchools().then((facultades) => {
      const facultadesAux = facultades;
      facultadesAux.push(todos);

      setFacultades(facultadesAux);
      setLoading(false);
      props.changeSchools(facultades);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    props.changeFacultadFiltro(event.target.value);
  };

  return (
    <div>
      {!loading && (
        <FormControl className={classes.formControl}>
          <InputLabel id="facultad-selecionada">Facultad</InputLabel>
          <Select
            labelId="facultad-selecionada"
            id="facultad-selecionada-select"
            value={facultadSeleccionada}
            onChange={handleChange}
          >
            {facultades.map((facultad) => {
              return (
                <MenuItem key={facultad.idfacultad} value={facultad.idfacultad}>{facultad.namefacultad}</MenuItem>
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
  changeSchools: (facultades) => dispatch(changeSchools(facultades)),
  changeFacultadFiltro: (facultad) => dispatch(changeFacultadFiltro(facultad)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FacultadFiltro);
