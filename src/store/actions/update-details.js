import axios from 'axios';
import * as actionTypes from './actionTypes';

const updateDetailsSuccess = userData => {
    return {
        type: actionTypes.UPDATE_USER_DETAIL_SUCCESS,
        userData: userData
    };
};
const updateDetailsFailure = error => {
    return {
        type: actionTypes.UPDATE_USER_DETAIL_FAILURE,
        error: error
    };
};
export const updateDetails = (inputData, token) => {
    return dispatch => {
        const graphqlQuery = {
            query: `
                mutation UpdateUser($firstname: String!, $lastname: String!, $email: String!) {
                    updateUserDetails(detailsInput: { firstname: $firstname, lastname: $lastname, email: $email})
                }
            `,
            variables: { firstname: inputData.firstname, lastname: inputData.lastname, email: inputData.email }
        };
        const axiosHeaders = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };        
        
        axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery, axiosHeaders)
        .then(() => {
            const graphqlQuery = {
                query: `
                    query FetchUser($id: Int!) {
                        getUserDetails(userId: $id) {
                            firstname lastname email
                        }
                    }
                `,
                variables: { id: +inputData.id }
            };
            axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery).then(response => {
                dispatch(updateDetailsSuccess(response.data.data.getUserDetails));
            })
            .catch(error => {
                updateDetailsFailure(error.response);
            });
        })
        .catch(error => {
            updateDetailsFailure(error.response);
        });
    };
};


const updatePasswordSuccess = message => {
    return {
        type: actionTypes.UPDATE_PASSWORD_SUCCESS,
        message: message
    };
};
const updatePasswordFailure = error => {
    return {
        type: actionTypes.UPDATE_PASSWORD_FAILURE,
        error: error
    };
};
export const updatePassword = (inputData, token) => {
    return dispatch => {

        const graphqlQuery = {
            query: `
                mutation UpdatePassword($currentPw: String!, $newPw: String!, $confirmNewPw: String!) {
                    changePassword(pwdInput: { currentPassword: $currentPw, newPassword: $newPw, confirmNewPassword: $confirmNewPw})
                }
            `,
            variables: { currentPw: inputData.currentPassword, newPw: inputData.newPassword, 
                confirmNewPw: inputData.confirmPassword }
        };
        const axiosHeaders = {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        };        
        
        axios.post(process.env.REACT_APP_GRAPHQL_URL, graphqlQuery, axiosHeaders)
        .then(response => {
            dispatch(updatePasswordSuccess(response.data));
        })
        .catch(error => {
            dispatch(updatePasswordFailure(error.response));
        });
    };
};