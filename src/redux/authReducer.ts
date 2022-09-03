import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "AUTH/SET_USER_DATA";
const SET_CAPTCHA_URL = "AUTH/SET_CAPTCHA_URL";

type initialStateType = typeof initialState;
let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
}

const authReducer = (state = initialState, action: actionsType) => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.data,
                // userId: 1 // странная бага
            };
        default:
            return state;
    }
}

type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    data: {
        userId: number | null
        login: string | null
        email: string | null
        isAuth: boolean
    }
}
export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA,
    data: {userId, login, email, isAuth}
});

type setCaptchaURLType = {
    type: typeof SET_CAPTCHA_URL
    data: { captchaURL: string }
}
export const setCaptchaURL = (captchaURL:string): setCaptchaURLType => ({
    type: SET_CAPTCHA_URL,
    data: {captchaURL}
});

type actionsType = setAuthUserDataType | setCaptchaURLType;

export const getAuthUserData = () => async (dispatch:any) => {
    const response = await authAPI.getAuthData(); // ajax запрос об авторизации // возвращает promise
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, login, email, true)); // сетает авторизационные данные
    }
}

export const logIn = (email:string, password:string,rememberMe:boolean, captcha:any) => async (dispatch:any) => {
    const response = await authAPI.logIn(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL());
        }
        dispatch(stopSubmit(
            "login",
            {_error: response.data.messages[0]}
        ));
    }
}

export const logOut = () => async (dispatch:any) => {
    const response = await authAPI.logOut();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaURL = () => async (dispatch:any) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;
    dispatch(setCaptchaURL(captchaURL));
}


export default authReducer;