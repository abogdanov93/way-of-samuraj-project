import {stateType} from "../store"

export const getIsAuth = (state: stateType) => {
    return state.auth.isAuth
}

export const getLogin = (state: stateType) => {
    return state.auth.login
}

export const getCaptchaURL = (state: stateType) => {
    return state.auth.captchaURL
}
