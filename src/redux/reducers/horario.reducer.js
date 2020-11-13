import { CHANGE_HORARIO, CHANGE_HORARIOS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initialState = {
  horarios: [],
  horario: null,
  loading: true,
};

function horarioReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_HORARIOS: {
      return {
        ...state,
        horarios: action.horarios,
        loading: false,
      }
    }
    case CHANGE_HORARIO: {
      return {
        ...state,
        horario: action.horario,
      }
    }
    case CLEAN_ALL_REDUCERS: {
      return initialState
    }
    default:
      return state;
  }
}

export default horarioReducer;
