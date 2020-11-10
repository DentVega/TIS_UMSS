import { CHANGE_USERSLOG, CHANGE_USERSLOGS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initState = {
  userslog: null,
  userslogs: [],
  loading: true
};

function userslogReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_USERSLOGS: {
      return {
        ...state,
        userslogs: action.userslogs,
        loading: false
      };
    }
    case CHANGE_USERSLOG: {
      return {
        ...state,
        userslog: action.userslog,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default userslogReducer;