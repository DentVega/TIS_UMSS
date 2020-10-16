import { OPEN_DRAWER, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initState = {
  openDrawer: true,
};

function appReducer(state = initState, action) {
  switch (action.type) {
    case OPEN_DRAWER: {
      return {
        ...state,
        openDrawer: !state.openDrawer,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default appReducer;
