import { CHANGE_MATERIA, CHANGE_MATERIAS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initialState = {
  materias: [],
  materia: [],
  loading: true,
}

function materiasReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MATERIAS: {
      return {
        ...state,
        materias: action.materias,
        loading: false,
      }
    }
    case CHANGE_MATERIA: {
      return {
        ...state,
        materia: action.materia,
      }
    }
    case CLEAN_ALL_REDUCERS: {
      return initialState
    }
    default:
      return state;
  }
}

export default materiasReducer;
