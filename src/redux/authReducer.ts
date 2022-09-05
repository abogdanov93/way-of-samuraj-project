import {authAPI, resultCodeEnum, resultCodeForCaptchaEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {stateType} from "./reduxStore";

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
type setCaptchaURLType = {
    type: typeof SET_CAPTCHA_URL
    data: { captchaURL: string }
}
type actionsType = setAuthUserDataType | setCaptchaURLType;

export const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataType => ({
    type: SET_USER_DATA,
    data: {userId, login, email, isAuth}
});

export const setCaptchaURL = (captchaURL:string): setCaptchaURLType => ({
    type: SET_CAPTCHA_URL,
    data: {captchaURL}
});

type thunkType = ThunkAction<void, stateType, unknown, actionsType>;

export const getAuthUserData = (): thunkType => async (dispatch) => {
    const data = await authAPI.getAuthData(); // ajax запрос об авторизации // возвращает promise
    if (data.resultCode === resultCodeEnum.success) {
        let {id, login, email} = data.data;
        dispatch(setAuthUserData(id, login, email, true)); // сетает авторизационные данные
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch:any) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha);
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(getAuthUserData());
    } else {
        if (data.resultCode === resultCodeForCaptchaEnum.captchaIsRequired) {
            dispatch(getCaptchaURL());
        }
        dispatch(stopSubmit(
            "login",
            {_error: data.messages[0]}
        ));
    }
} // не понимаю, как типизировать

export const logOut = (): thunkType => async (dispatch) => {
    const data = await authAPI.logOut();
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaURL = (): thunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL();
    const captchaURL = data.url;
    dispatch(setCaptchaURL(captchaURL));
}


export default authReducer;