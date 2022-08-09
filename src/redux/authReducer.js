import React from "react";
import {authAPI} from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export const setAuthUserData = (userId, login, email, isAuth) => ({type: SET_USER_DATA, data: {userId, login, email, isAuth}});

export const getAuthUserData = () => (dispatch) => {
        authAPI.getAuthData()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    dispatch(setAuthUserData(id, login, email, true));
                }
            });
}

export const logIn = (email, password, rememberMe) => (dispatch) => {
        authAPI.logIn(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData());
                }
            });
}

export const logOut = () => (dispatch) => {
        authAPI.logOut()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
}

export default authReducer;