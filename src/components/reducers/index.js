import * as actions from './actions';

const initialState = {
  isLoggedIn: false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true
      };
    case actions.USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};
export default reducer;
