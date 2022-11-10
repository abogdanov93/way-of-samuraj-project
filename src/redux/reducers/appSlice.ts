import {getAuthUserData} from "./authSlice"
import {createSlice} from "@reduxjs/toolkit"
import {AppDispatchType} from "../store"

type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        initializationSuccess(state) {
            state.initialized = true
        }
    }
})

export const initializeApp = () => async (dispatch: AppDispatchType) => {
    try {
        await dispatch(getAuthUserData())
        dispatch(appSlice.actions.initializationSuccess())
    } catch (e) {
        console.log(e)
    }

    // const promise = dispatch(getAuthUserData())
    // promise.then(() => {
    //     dispatch(appSlice.actions.initializationSuccess())
    // })
}
// todo: как переделать санку без асинхронного запроса?

export default appSlice.reducer