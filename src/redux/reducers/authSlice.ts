import {createSlice, PayloadAction} from "@reduxjs/toolkit"

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaURL?: string | null
    ownersAvatar: string | null
    errorMessage?: null | string
}

const initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null,
    ownersAvatar: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUserData (state, action: PayloadAction<InitialStateType>) {
            state.id = action.payload.id
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = action.payload.isAuth
            state.ownersAvatar = action.payload.ownersAvatar
        },
        setCaptchaURL (state, action: PayloadAction<string>) {
            state.captchaURL = action.payload
        },
        setErrorMessage (state, action: PayloadAction<string>) {
            state.errorMessage = action.payload
        }
    }
})


export default authSlice.reducer