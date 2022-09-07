import {authAPI, resultCodeEnum, resultCodeForCaptchaEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {inferActionsType, stateType} from "./reduxStore";

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
        case "AUTH_SET_USER_DATA":
        case "AUTH_SET_CAPTCHA_URL":
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

type actionsType = inferActionsType<typeof actions>;

const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: "AUTH_SET_USER_DATA",
        data: {userId, login, email, isAuth}
    } as const),

    setCaptchaURL: (captchaURL: string) => ({
        type: "AUTH_SET_CAPTCHA_URL",
        data: {captchaURL}
    } as const)
}
type thunkType = ThunkAction<void, stateType, unknown, actionsType>;

export const getAuthUserData = (): thunkType => async (dispatch) => {
    const data = await authAPI.getAuthData(); // ajax запрос об авторизации // возвращает promise
    if (data.resultCode === resultCodeEnum.success) {
        let {id, login, email} = data.data;
        dispatch(actions.setAuthUserData(id, login, email, true)); // сетает авторизационные данные
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
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaURL = (): thunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL();
    const captchaURL = data.url;
    dispatch(actions.setCaptchaURL(captchaURL));
}


export default authReducer;