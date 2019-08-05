import * as actions from './actions';

const initialState = {
  isLoggedIn: false,
  uid: null
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        uid: action.payload.uid ? action.payload.uid : null
      };
    case actions.USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        uid: null
      };
    default:
      return state;
  }
};
export default reducer;
