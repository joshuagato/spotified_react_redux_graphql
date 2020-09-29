import axios from 'axios';
import * as actionTypes from './actionTypes';


const fetchUserForMusicHomeSuccess = userDetails => {
  return {
    type: actionTypes.FETCH_USER_FOR_HOME_SUCCESS,
    userData: userDetails
  };
};
export const fetchUserForMusicHome = userId => {
  return dispatch => {
    const graphqlQuery = {
      query: `
        query FetchUser($id: Int!) {
          getUserDetails(userId: $id) {
            firstname lastname email
          }
        }
      `,
      variables: { id: +userId }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery).then(response => {
      dispatch(fetchUserForMusicHomeSuccess(response.data.data.getUserDetails));
    })
    .catch(error => console.log(error));
  };
};


const fetchUserForUpdateDetailsSuccess = userDetails => {
    return {
        type: actionTypes.FETCH_USER_FOR_UPDATE_SUCCESS,
        userData: userDetails
    };
};
export const fetchUserForUpdateDetails = userId => {
  return dispatch => {
    const graphqlQuery = {
      query: `
        query FetchUser($id: Int!) {
          getUserDetails(userId: $id) {
            firstname lastname email
          }
        }
      `,
      variables: { id: +userId }
    };
    axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery).then(response => {
      dispatch(fetchUserForUpdateDetailsSuccess(response.data.data.getUserDetails));
    })
    .catch(error => console.log(error));
  };
};