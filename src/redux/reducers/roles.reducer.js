import { CHANGE_ROLE, CHANGE_ROLES, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initState = {
  role: null,
  roles: [],
  loading: true
};

function rolesReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_ROLES: {
      return {
        ...state,
        roles: action.roles,
        loading: false
      };
    }
    case CHANGE_ROLE: {
      return {
        ...state,
        role: action.role,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default rolesReducer;
