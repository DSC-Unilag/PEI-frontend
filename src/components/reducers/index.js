import * as actions from '../reducers/actions';
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
    default:
      return state;
  }
};
export default reducer;
