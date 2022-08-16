import React from "react";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "auth/SET_USER_DATA";

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

export const setAuthUserData = (userId, login, email, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, login, email, isAuth}
});

export const getAuthUserData = () => async (dispatch) => {
    const response = await authAPI.getAuthData();            // ajax запрос об авторизации // возвращает promise
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true)); // сетает авторизационные данные
    }
}

export const logIn = (email, password, rememberMe) => async (dispatch) => {
    const response = await authAPI.logIn(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        dispatch(stopSubmit(
            "login",
            {_error: response.data.messages[0]}
        ));
    }
}

export const logOut = () => async (dispatch) => {
    const response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;