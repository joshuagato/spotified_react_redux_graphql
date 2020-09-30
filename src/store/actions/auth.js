import axios from 'axios';
import * as actionTypes from './actionTypes';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expiry');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};


const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expiry')); //convert from string-date to date-date
      
      if(expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));                
      }
    }
  };
};


// we can also export it, so as to dispatch it in the Login component
const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};


const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId
  };
};
const authFail = error => {
  // console.log("ERROR", error.data.errors[0].message)
  return {
    type: actionTypes.AUTH_FAIL,
    // error: error
    error: error.data.errors[0].message
  };
};
export const auth = (email, password) => {
  return dispatch => {
    // We can dispatch authStart here, if for instance we want to implement a spinner

    const graphqlQuery = {
      query: `
        query UserLogin($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token userId
          }
        }
      `,
      variables: { email: email, password: password }
    };
    
    axios.post('/graphql', graphqlQuery).then(response => {
      localStorage.setItem('token', response.data.data.login.token);
      localStorage.setItem('userId', response.data.data.login.userId);
      const expiry = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('expiry', expiry);
      
      dispatch(authSuccess(response.data.data.login.token, response.data.data.login.userId));
      dispatch(setAuthRedirectPath('/music-home'));
    })
    .catch(error => {
      // console.log(error.response.data.errors[0].message); //we can map through this array
      if (error.response) console.log("error", error.response);
      
      dispatch(authFail(error.response));
    });
  };
};