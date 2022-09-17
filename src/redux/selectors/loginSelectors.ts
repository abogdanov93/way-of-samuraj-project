import {stateType} from "../reduxStore"

export const getIsAuth = (state: stateType) => {
    return state.auth.isAuth
}

export const getCaptchaURL = (state: stateType) => {
    return state.auth.captchaURL
}
