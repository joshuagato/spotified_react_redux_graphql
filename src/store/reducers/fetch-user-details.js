import * as actionTypes from '../actions/actionTypes';

const initialState = {
  userDataForAll: {},
  // errors: '',
  // userDataForHome: {},
  // userDataForUpdateDetail: {}
};

// The reason why userDataForUpdateDetailis not loading the data initially is simple, we call on fecthData
// method too late, that is, right inside that very component, so the data gets ready late. We can fix this
// by invoking fetchData in it's parent, and pass on the result as props to the component(UpdateDetails.js)

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_USER_FOR_HOME_SUCCESS:
      return { ...state, userDataForAll: action.userData };

      case actionTypes.FETCH_USER_FOR_UPDATE_SUCCESS:
        return { ...state, userDataForAll: action.userData };

      case actionTypes.UPDATE_USER_DETAIL_SUCCESS:
        return { ...state, userDataForAll: action.userData };
      
      default: return state;
  }
};

export default reducer;