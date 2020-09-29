import * as actionTypes from '../actions/actionTypes';

const initialState = {
  details: '',
  errors: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return { ...state, details: action.details };

    case actionTypes.REGISTER_FAILURE:
      return { ...state, errors: action.errors };
    
    default: return state;
  }
};

export default reducer;