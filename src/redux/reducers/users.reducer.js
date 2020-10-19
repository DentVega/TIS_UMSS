import { CHANGE_USER_SELECTED, CHANGE_USERS, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initState = {
  userSelected: null,
  users: [],
  loading: true,
};

function usersReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_USERS: {
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    }
    case CHANGE_USER_SELECTED: {
      return {
        ...state,
        userSelected: action.userSelected,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default usersReducer;
