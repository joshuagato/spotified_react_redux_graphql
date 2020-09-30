import axios from 'axios';
import * as actionTypes from './actionTypes';

const registerSuccess = details => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    details: details
  };
};
const registerFailure = errors => {
  return {
    type: actionTypes.REGISTER_FAILURE,
    errors: errors
  };
};
export const registerUser = userInput => {
  return dispatch => {
    const graphqlQuery = {
      query: `
        mutation RegisterUser($firstname: String!, $lastname: String!, $email: String!, $password: String!) {
          createUser(userInput: { firstname: $firstname, lastname: $lastname, email: $email, password: $password }) {
            id firstname lastname email
          }
        }
      `,
      variables: { firstname: userInput.firstname, lastname: userInput.lastname, 
        email: userInput.email, password: userInput.password }
    };

    axios.post('/graphql', graphqlQuery).then(response => {
      dispatch(registerSuccess(response.data.data));
      // dispatch(registerSuccess(response.data.data.createUser));
      // A Redirect and/or success message has to be displayed to the user
    })
    .catch(error => {
      // console.log(error.response.data.errors[0].message); //we can map through this array
      console.log("error", error.response);
      
      dispatch(registerFailure(error.response));
    });
  };
};