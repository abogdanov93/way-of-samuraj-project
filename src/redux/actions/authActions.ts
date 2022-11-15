import {AppDispatchType} from "../store"
import {authAPI} from "../../api/authAPI"
import {resultCodeEnum, resultCodeForCaptchaEnum} from "../../api/api"
import {profileAPI} from "../../api/profileAPI"
import {securityAPI} from "../../api/securityAPI"
import {authSlice} from "../reducers/authSlice"
import {useNavigate} from "react-router-dom";

export const getAuthUserData = () => async (dispatch: AppDispatchType) => {
    const authData = await authAPI.getAuthData()
    if (authData.resultCode === resultCodeEnum.success) {
        const profileData = await profileAPI.getProfile(authData.data.id)
        const ownersAvatar = profileData.photos.small
        let payload = {
            ...authData.data,
            isAuth: true,
            ownersAvatar
        }
        dispatch(authSlice.actions.setAuthUserData(payload))
    }
}

export const logInThunk = (email: string, password: string, rememberMe: boolean, captcha: string) =>
    async (dispatch: AppDispatchType) => {
        try {
            const data = await authAPI.logIn(email, password, rememberMe, captcha)
            if (data.resultCode === resultCodeEnum.success) {
                await dispatch(getAuthUserData())
            } else {
                alert(JSON.stringify(data))
                if (data.resultCode === resultCodeForCaptchaEnum.captchaIsRequired) {
                    await dispatch(getCaptchaURL())
                }
            }
        } catch (e) {
            alert(JSON.stringify(e))
        }
    }

export const signOut = () => async (dispatch: AppDispatchType) => {
    const data = await authAPI.logOut()
    if (data.resultCode === resultCodeEnum.success) {
        let payload = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            ownersAvatar: null
        }
        dispatch(authSlice.actions.setAuthUserData(payload))
    }
}

export const getCaptchaURL = () => async (dispatch: AppDispatchType) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaURL = data.url
    dispatch(authSlice.actions.setCaptchaURL(captchaURL))
}