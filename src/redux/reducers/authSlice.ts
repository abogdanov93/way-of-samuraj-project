import {resultCodeEnum, resultCodeForCaptchaEnum} from "../../api/api"
import {AppDispatchType, baseActionType, baseThunkType} from "../store"
import {authAPI, AuthDataType} from "../../api/authAPI"
import {securityAPI} from "../../api/securityAPI"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaURL?: string | null
}

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null
}

export const getAuthUserData = () => async (dispatch: AppDispatchType) => {
    const data = await authAPI.getAuthData()
    if (data.resultCode === resultCodeEnum.success) {
        let payload = {
            ...data.data,
            isAuth: true
        }
        dispatch(authSlice.actions.setAuthUserData(payload))
    }
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
        },
        setCaptchaURL(state, action: PayloadAction<string>) {
            state.captchaURL = action.payload
        }
    }
})


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
            isAuth: false
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