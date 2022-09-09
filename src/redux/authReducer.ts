import {resultCodeEnum, resultCodeForCaptchaEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {baseActionType, baseThunkType} from "./reduxStore"
import {authAPI} from "../api/authAPI"
import {securityAPI} from "../api/securityAPI"

type initialStateType = typeof initialState
type actionsType = baseActionType<typeof actions>
type thunkType = baseThunkType<actionsType | FormAction> // FormAction для типизации stopSubmit


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
            }
        default:
            return state
    }
}

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

export const getAuthUserData = (): thunkType => async (dispatch) => {
    const data = await authAPI.getAuthData() // ajax запрос об авторизации // возвращает promise
    if (data.resultCode === resultCodeEnum.success) {
        let {id, login, email} = data.data
        dispatch(actions.setAuthUserData(id, login, email, true)) // сетает авторизационные данные
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): thunkType =>
    async (dispatch) => {
    const data = await authAPI.logIn(email, password, rememberMe, captcha)
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === resultCodeForCaptchaEnum.captchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        dispatch(stopSubmit(
            "login",
            {_error: data.messages[0]}
        ))
    }
}

export const logOut = (): thunkType => async (dispatch) => {
    const data = await authAPI.logOut()
    if (data.resultCode === resultCodeEnum.success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaURL = (): thunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url
    dispatch(actions.setCaptchaURL(captchaURL))
}


export default authReducer