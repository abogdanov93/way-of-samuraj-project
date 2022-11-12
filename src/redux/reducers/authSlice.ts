import {resultCodeEnum, resultCodeForCaptchaEnum} from "../../api/api"
import {AppDispatchType, baseActionType, baseThunkType} from "../store"
import {authAPI, AuthDataType} from "../../api/authAPI"
import {securityAPI} from "../../api/securityAPI"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../../api/profileAPI";

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaURL?: string | null
    ownersAvatar: string | null
}

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null,
    ownersAvatar: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUserData(state, action: PayloadAction<InitialStateType>) {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = action.payload.isAuth
            state.ownersAvatar = action.payload.ownersAvatar
        },
        setCaptchaURL(state, action: PayloadAction<string>) {
            state.captchaURL = action.payload
        }
    }
})

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
        const data = await authAPI.logIn(email, password, rememberMe, captcha)
        if (data.resultCode === resultCodeEnum.success) {
            await dispatch(getAuthUserData())
        } else {
            if (data.resultCode === resultCodeForCaptchaEnum.captchaIsRequired) {
                await dispatch(getCaptchaURL())
            }
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

export default authSlice.reducer