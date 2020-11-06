import { CHANGE_SCHOOL, CHANGE_SCHOOLS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initialState = {
  school: null,
  schools: [],
  loading: true,
};

function schoolReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SCHOOLS:
      return {
        ...state,
        schools: action.schools,
        loading: false,
      };
    case CHANGE_SCHOOL: {
      return {
        ...state,
        school: action.school,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default schoolReducer;
