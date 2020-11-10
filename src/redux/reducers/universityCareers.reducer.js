import { CHANGE_AUX_CARRERA, CHANGE_CARRERA, CHANGE_CARRERAS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initialState = {
  careers: [],
  careersAux: [],
  career: null,
  loading: true,
};

function universityCareersReducer(state= initialState, action) {
  switch (action.type) {
    case CHANGE_CARRERAS: {
      return {
        ...state,
        careers: action.careers,
        careersAux: action.careers,
        loading: false,
      }
    }
    case CHANGE_CARRERA: {
      return {
        ...state,
        career: action.career,
      }
    }
    case CHANGE_AUX_CARRERA: {
      return {
        ...state,
        careersAux: action.careers,
      }
    }
    case CLEAN_ALL_REDUCERS: {
      return initialState;
    }
    default:
      return state;
  };
}

export default universityCareersReducer;
