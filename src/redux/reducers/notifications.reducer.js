import { UPDATE_NOTIFICATIONS, CHANGE_NUMBER_NOTIFICATIONS } from '../actions/actions';

const initialState = {
  numberNotifications: 0,
  updateNotification: 0,
};

function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_NUMBER_NOTIFICATIONS: {
      return {
        ...state,
        numberNotifications: action.numberNotifications,
      }
    }
    case UPDATE_NOTIFICATIONS: {
      return {
        ...state,
        updateNotification: state.updateNotification + 1,
      }
    }
    default:
      return state;
  }
}

export default notificationsReducer;
