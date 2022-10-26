import {StateType} from "../store"

export const getIsAuth = (state: StateType) => {
    return state.auth.isAuth
}

export const getLogin = (state: StateType) => {
    return state.auth.login
}

export const getCaptchaURL = (state: StateType) => {
    return state.auth.captchaURL
}
