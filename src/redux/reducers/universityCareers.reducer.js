import { CHANGE_CARRERA, CHANGE_CARRERAS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initialState = {
  careers: [],
  career: null,
  loading: true,
};

function universityCareersReducer(state= initialState, action) {
  switch (action.type) {
    case CHANGE_CARRERAS: {
      return {
        ...state,
        careers: action.careers,
        loading: false,
      }
    }
    case CHANGE_CARRERA: {
      return {
        ...state,
        career: action.career,
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
