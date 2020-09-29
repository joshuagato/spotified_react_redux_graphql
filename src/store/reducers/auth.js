import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: '',
  // error: [],
  // isAuthenticated: false,
  authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_SUCCESS:
      // return { ...state, token: action.token, userId: action.userId, isAuthenticated: true };
      return { ...state, token: action.token, userId: action.userId };

    case actionTypes.AUTH_FAIL:
      // return { ...state, token: null, userId: null, error: action.error, isAuthenticated: false };
      return { ...state, token: null, userId: null, error: action.error };

    case actionTypes.AUTH_LOGOUT:
      // return { ...state, token: null, userId: null, isAuthenticated: false };
      return { ...state, token: null, userId: null };

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return { ...state, authRedirectPath: action.path };

    default: return state;
  }
};

export default reducer;