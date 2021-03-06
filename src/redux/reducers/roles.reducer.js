import { CHANGE_ROLE,CHANGE_USER_ROLE, CHANGE_USERS_ROLE, CHANGE_ROLES, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initState = {
  role: null,
  roles: [],
  userRole:null,
  usersRole:[],
  loading: true,
  loadingUsersRole:true,
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
    case CHANGE_USER_ROLE:{
      return {
        ...state,
        userRole: action.userRole
      }
    }
    case CHANGE_USERS_ROLE:{
      return {
        ...state,
        usersRole: action.usersRole,
        loadingUsersRole:false,
      }
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default rolesReducer;
