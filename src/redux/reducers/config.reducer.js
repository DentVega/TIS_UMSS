import { CHANGE_TAB_INDEX, CLEAN_ALL_REDUCERS } from '../actions/actions';

const initState = {
  tab: 0,
};

function configReducer(state = initState, action) {
  switch (action.type) {
    case CHANGE_TAB_INDEX: {
      return {
        ...state,
        tab: action.index,
      };
    }
    case CLEAN_ALL_REDUCERS: {
      return initState;
    }
    default:
      return state;
  }
}

export default configReducer;
