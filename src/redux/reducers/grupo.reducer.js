import {
  CHANGE_DATA_GRUPOS,
  CHANGE_GRUPO,
  CHANGE_GRUPO_HORARIO,
  CHANGE_GRUPO_HORARIOS,
  CHANGE_GRUPOS,
  CLEAN_ALL_REDUCERS,
} from '../actions/actions';

const initState = {
  grupos: [],
  grupoHorarios: [],
  grupo: null,
  grupoHorario: null,
  loading: true,
  loadingGrupoHorarios: true,
};

function grupoReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_DATA_GRUPOS: {
      return {
        ...state,
        grupos: action.data.grupos,
        grupoHorarios: action.data.grupoHorarios,
        loading: false,
      };
    }
    case CHANGE_GRUPOS: {
      return {
        ...state,
        grupos: action.grupos,
      };
    }
    case CHANGE_GRUPO_HORARIOS: {
      return {
        ...state,
        grupoHorarios: action.grupoHorarios,
        loadingGrupoHorarios: false,
      };
    }
    case CHANGE_GRUPO: {
      return {
        ...state,
        grupo: action.grupo,
      };
    }
    case CHANGE_GRUPO_HORARIO: {
      return {
        ...state,
        grupoHorario: action.grupoHorario,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default grupoReducer;
