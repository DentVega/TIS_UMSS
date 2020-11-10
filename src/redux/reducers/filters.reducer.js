import {
  CHANGE_CARRERA_SELECCIONADA_FILTRO,
  CHANGE_FACULTAD_SELECCIONADA_FILTRO, CHANGE_MATERIA_SELECCIONADA_FILTRO,
  CLEAN_ALL_REDUCERS
} from '../actions/actions';

const initState = {
  facultadSeleccionada: 0,
  carreraSeleccionada: 0,
  materiaSeleccionada: 0,
};

function filtersReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_FACULTAD_SELECCIONADA_FILTRO: {
      return {
        ...state,
        facultadSeleccionada: action.facultadSeleccionada,
      };
    }
    case CHANGE_CARRERA_SELECCIONADA_FILTRO: {
      return {
        ...state,
        carreraSeleccionada: action.carreraSeleccionada,
      };
    }
    case CHANGE_MATERIA_SELECCIONADA_FILTRO: {
      return {
        ...state,
        materiaSeleccionada: action.materiaSeleccionada
      }
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default filtersReducer;
